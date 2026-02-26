# admin-ai-service

AI助手后端服务 - 使用Node.js + Express开发。

## 功能特性

- 对话API
- AI模型适配层（支持多个AI服务商）
- 知识库检索和RAG
- 对话历史管理

## 环境变量

创建 `.env` 文件：

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=admin_ai

# AI模型配置
OPENAI_API_KEY=
OPENAI_BASE_URL=

QWEN_API_KEY=
WENXIN_API_KEY=
ZHIPU_API_KEY=
```

## 开发

```bash
pnpm install
pnpm dev
```

## 启动

```bash
pnpm start
```
