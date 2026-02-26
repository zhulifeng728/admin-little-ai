# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

后台管理系统AI小助手 - 一个为复杂后台管理系统提供智能AI助手的解决方案。

## Architecture

Monorepo结构，包含三个子项目：

1. **admin-ai-service** (Node.js + Express)
   - 后端服务，提供API接口
   - AI模型适配层（支持OpenAI、通义千问等）
   - 知识库检索和RAG
   - 数据库：MySQL

2. **admin-ai-console** (Vue 3 + Element Plus)
   - 配置后台管理系统
   - 知识库管理（Markdown编辑）
   - 路由配置管理
   - AI模型配置管理

3. **admin-ai-widget** (原生JavaScript)
   - 前端聊天组件
   - 技术栈无关，可集成到任何系统
   - 通过CustomEvent与宿主系统通信

## Common Commands

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev:service   # 启动后端服务 (端口3000)
pnpm dev:console   # 启动配置后台 (端口5173)
pnpm dev:widget    # 启动组件演示 (端口5174)

# 构建
pnpm build         # 构建所有项目
pnpm build:service
pnpm build:console
pnpm build:widget
```

## Database Setup

```bash
# 创建数据库和表
mysql -u root -p < packages/admin-ai-service/database/schema.sql

# 插入示例数据
mysql -u root -p < packages/admin-ai-service/database/seed.sql
```

## Environment Variables

后端服务需要配置 `packages/admin-ai-service/.env`：

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=admin_ai
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
```

## Key Design Patterns

### 通信机制
前端组件通过浏览器原生CustomEvent与宿主系统通信：
- `ai-assistant-navigate`: 页面跳转事件
- `ai-assistant-query`: 数据查询事件（未来）
- `ai-assistant-action`: 快捷操作事件（未来）

### AI对话流程
1. 用户提问 → 前端组件
2. 组件发送到后端API (`POST /api/chat`)
3. 后端检索知识库和路由信息
4. 调用AI模型生成回答（携带上下文）
5. 返回Markdown格式的回答
6. 前端渲染，链接点击触发CustomEvent

### 数据库模型
- `ai_models`: AI模型配置
- `knowledge_base`: 知识库文档
- `routes`: 页面路由配置
- `chat_history`: 对话历史（可选）

## Development Notes

- 后端使用ES模块 (`type: "module"`)
- 前端组件打包为UMD和ES格式
- 配置后台使用Vue 3 Composition API
- 所有API响应统一JSON格式
- Markdown渲染使用marked.js

## Current Status

MVP阶段已完成：
- ✅ 数据库设计
- ✅ 后端服务基础功能
- ✅ 配置后台管理系统
- ✅ 前端聊天组件
- ✅ 系统解读和使用指引功能

待开发：
- 数据查询和展示功能
- 快捷操作功能
- 向量数据库集成
- 权限控制
