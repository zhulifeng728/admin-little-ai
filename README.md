# 后台管理系统AI小助手

一个为复杂后台管理系统提供智能AI助手的解决方案，包含前端对话组件、配置后台和后端服务。

## 项目结构

```
admin-little-ai/
├── packages/
│   ├── admin-ai-widget/      # AI助手前端组件（原生JS）
│   ├── admin-ai-console/     # 配置后台管理系统
│   └── admin-ai-service/     # 后端服务
├── docs/                     # 文档
│   └── plans/               # 设计文档
└── README.md
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动前端组件开发
pnpm dev:widget

# 启动配置后台开发
pnpm dev:console

# 启动后端服务开发
pnpm dev:service
```

### 构建

```bash
# 构建所有项目
pnpm build

# 单独构建
pnpm build:widget
pnpm build:console
pnpm build:service
```

## 核心功能

### 已实现功能

1. **智能问答** - 基于知识库的智能问答，支持Markdown格式回复
2. **页面导航** - AI回复中包含可点击的页面链接，自动跳转到相关页面
3. **智能推荐** - 根据当前页面路由智能推荐相关问题
4. **打字机效果** - AI回复逐字显示，提升交互体验
5. **拖拽移动** - 小球可自由拖动到屏幕任意位置
6. **智能定位** - 对话面板根据小球位置智能显示，避免超出屏幕
7. **知识库管理** - 支持添加、编辑、删除知识库内容
8. **路由配置** - 配置系统页面路由，AI可引导用户导航
9. **AI模型配置** - 支持配置多个AI模型（OpenAI、DeepSeek等）

### 规划中功能

- [ ] 数据查询和展示 - 自然语言查询数据
- [ ] 快捷操作 - 通过对话执行常用操作
- [ ] 多轮对话优化 - 上下文理解增强
- [ ] 语音交互 - 语音输入和播报

## 功能特性详解

### 1. 智能问答
- 基于知识库的RAG（检索增强生成）
- 支持Markdown格式回复，包括代码块、列表等
- 自动搜索相关知识库和路由信息

### 2. 打字机效果
- AI回复逐字显示，提升用户体验
- 使用transform优化性能，流畅丝滑
- 显示完成后自动渲染Markdown格式

### 3. 智能推荐
- 根据当前页面路由自动推荐相关问题
- 监听路由变化，动态更新推荐内容
- 点击推荐问题直接发送，快速获取答案

### 4. 拖拽移动
- 小球可自由拖动到屏幕任意位置
- 使用GPU加速，拖动流畅无卡顿
- 自动限制在窗口范围内，不会拖出屏幕
- 区分点击和拖拽，拖动不会触发打开面板

### 5. 智能定位
- 对话面板根据小球位置智能显示
- 小球在左侧时面板显示在右侧，反之亦然
- 面板垂直居中对齐小球
- 自动避免超出屏幕边界

### 6. 页面导航
- AI回复中的链接可直接点击跳转
- 自动集成Vue Router，无缝跳转
- 支持中文路径自动解码

## 技术栈

- **前端组件**: 原生JavaScript + Web Components
- **配置后台**: Vue 3 + Element Plus
- **后端服务**: Node.js + Express
- **数据库**: MySQL + 向量数据库

## 文档

详细设计文档请查看：[产品设计文档](./docs/plans/2026-02-26-admin-ai-assistant-design.md)

## 开发计划

- [x] 产品设计
- [x] 第一阶段：MVP - 系统解读和使用指引
- [ ] 第二阶段：数据查询和展示
- [ ] 第三阶段：快捷操作
- [ ] 第四阶段：优化增强

## 使用指南

### 1. 安装依赖

```bash
# 安装pnpm（如果还没有）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 2. 配置数据库

```bash
# 创建MySQL数据库
mysql -u root -p < packages/admin-ai-service/database/schema.sql

# 插入示例数据
mysql -u root -p < packages/admin-ai-service/database/seed.sql
```

### 3. 配置环境变量

复制后端服务的环境变量示例文件：

```bash
cp packages/admin-ai-service/.env.example packages/admin-ai-service/.env
```

编辑 `.env` 文件，填入你的配置：

```env
PORT=3000

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=admin_ai

# AI模型配置（至少配置一个）
OPENAI_API_KEY=your_openai_key
OPENAI_BASE_URL=https://api.openai.com/v1
```

### 4. 启动服务

```bash
# 启动后端服务
pnpm dev:service

# 启动配置后台（新终端）
pnpm dev:console

# 启动前端组件演示（新终端）
cd packages/admin-ai-widget
pnpm dev
```

### 5. 访问系统

- 配置后台：http://localhost:5175
- Widget开发服务：http://localhost:5174
- 后端API：http://localhost:3000

**注意**：配置后台已集成AI助手组件，可直接在配置后台中体验AI助手功能。

### 6. 配置AI模型

1. 访问配置后台的"AI模型配置"页面
2. 添加或编辑AI模型配置
3. 填入API密钥和相关信息
4. 点击"启用"按钮激活模型

### 7. 添加知识库

1. 访问"知识库管理"页面
2. 点击"添加知识库"
3. 输入标题、选择分类、编写Markdown内容
4. 保存后，AI助手就能基于这些内容回答问题

### 8. 配置路由

1. 访问"路由配置"页面
2. 添加你的后台系统的页面路由
3. 填写路由路径、页面名称和描述
4. AI助手会在回答中提供相关页面的链接

### 9. 集成到你的系统

在你的后台管理系统中引入AI助手组件：

```html
<!-- 引入组件脚本 -->
<script src="http://localhost:5174/src/index.js" type="module"></script>

<script type="module">
  import AdminAIWidget from 'http://localhost:5174/src/index.js'

  // 初始化组件
  new AdminAIWidget({
    apiUrl: 'http://localhost:3000/api',
    position: 'bottom-right',
    theme: {
      primaryColor: '#409eff'
    }
  })
</script>
```

**在Vue应用中集成导航功能：**

```javascript
// main.js
import router from './router'

// 监听AI助手的导航事件
window.addEventListener('ai-assistant-navigate', (e) => {
  const path = e.detail.path
  console.log('AI助手请求导航到:', path)

  // 使用router进行页面跳转
  if (path && router) {
    router.push(path).catch(err => {
      console.error('路由跳转失败:', err)
    })
  }
})
```

### 10. 数据导入

系统支持批量导入知识库和路由配置：

```bash
# 导入知识库
curl -X POST http://localhost:3000/api/knowledge/import \
  -H "Content-Type: application/json" \
  -d @examples/scwork-knowledge-import.json

# 导入路由配置
curl -X POST http://localhost:3000/api/routes/import \
  -H "Content-Type: application/json" \
  -d @examples/scwork-routes-import.json
```

或在配置后台的"知识库管理"和"路由配置"页面使用导入功能。

## License

MIT
