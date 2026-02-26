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

1. **系统解读和使用指引** - 基于知识库的智能问答和页面导航
2. **数据查询和展示** - 自然语言查询数据
3. **快捷操作** - 通过对话执行常用操作

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

- 配置后台：http://localhost:5173
- 前端组件演示：http://localhost:5174/demo.html
- 后端API：http://localhost:3000

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
<script src="path/to/admin-ai-widget.umd.js"></script>

<script>
  // 初始化组件
  new AdminAIWidget({
    apiUrl: 'http://localhost:3000/api',
    position: 'bottom-right'
  })

  // 监听导航事件
  window.addEventListener('ai-assistant-navigate', (e) => {
    // 使用你的路由系统进行跳转
    router.push(e.detail.path)
  })
</script>
```

## License

MIT
