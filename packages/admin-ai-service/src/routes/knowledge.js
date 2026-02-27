import express from 'express';
import KnowledgeModel from '../models/Knowledge.js';

const router = express.Router();

// 获取所有知识库
router.get('/', async (req, res) => {
  try {
    const list = await KnowledgeModel.findAll();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取推荐问题（必须在/:id之前）
router.get('/suggested', async (req, res) => {
  try {
    const { route } = req.query;
    const questions = await KnowledgeModel.getSuggestedQuestions(route);
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个知识库
router.get('/:id', async (req, res) => {
  try {
    const item = await KnowledgeModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: '未找到' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建知识库
router.post('/', async (req, res) => {
  try {
    const id = await KnowledgeModel.create(req.body);
    res.json({ id, message: '创建成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新知识库
router.put('/:id', async (req, res) => {
  try {
    await KnowledgeModel.update(req.params.id, req.body);
    res.json({ message: '更新成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除知识库
router.delete('/:id', async (req, res) => {
  try {
    await KnowledgeModel.delete(req.params.id);
    res.json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 批量导入知识库
router.post('/import', async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: '导入数据格式错误' });
    }

    const results = [];
    for (const item of items) {
      try {
        const id = await KnowledgeModel.create(item);
        results.push({ success: true, id, title: item.title });
      } catch (error) {
        results.push({ success: false, title: item.title, error: error.message });
      }
    }

    res.json({
      message: '导入完成',
      total: items.length,
      success: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
