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
- [ ] 第一阶段：MVP - 系统解读和使用指引
- [ ] 第二阶段：数据查询和展示
- [ ] 第三阶段：快捷操作
- [ ] 第四阶段：优化增强

## License

MIT
