import express from 'express';
import KnowledgeModel from '../models/Knowledge.js';
import RouteModel from '../models/Route.js';
import AIModel from '../models/AIModel.js';
import AIAdapter from '../services/AIAdapter.js';

const router = express.Router();

// 对话接口
router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }

    // 1. 搜索相关知识库
    const knowledgeResults = await KnowledgeModel.search(message);

    // 2. 搜索相关路由
    const routeResults = await RouteModel.search(message);

    // 3. 构建上下文
    let context = '# 系统信息\n\n';

    if (knowledgeResults.length > 0) {
      context += '## 相关文档\n\n';
      knowledgeResults.forEach(kb => {
        context += `### ${kb.title}\n${kb.content}\n\n`;
      });
    }

    if (routeResults.length > 0) {
      context += '## 相关页面\n\n';
      routeResults.forEach(route => {
        context += `- [${route.name}](#${route.path}): ${route.description}\n`;
      });
    }

    // 4. 获取启用的AI模型
    const aiModel = await AIModel.findActive();
    if (!aiModel) {
      return res.status(500).json({ error: '未配置AI模型' });
    }

    // 5. 调用AI生成回答
    const adapter = new AIAdapter(aiModel);

    const messages = [
      {
        role: 'system',
        content: `你是一个后台管理系统的AI助手。你的任务是帮助用户理解系统功能和导航到相关页面。

当回答问题时：
1. **重要**：如果提到系统中的页面或功能，必须使用Markdown链接格式：[页面名称](#路由路径)
   例如：[分类分级工具集](#/docmap/docs/document-level-class)
2. 链接中的路由路径必须使用完整的路径，不要使用页面名称
3. 回答要简洁明了
4. 如果不确定，诚实地说不知道

以下是系统信息：
${context}`
      },
      ...history,
      {
        role: 'user',
        content: message
      }
    ];

    const reply = await adapter.chat(messages);

    res.json({
      type: 'text',
      content: reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('对话处理失败:', error);
    res.status(500).json({ error: error.message || '处理失败' });
  }
});

export default router;
