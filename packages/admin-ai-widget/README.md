# admin-ai-widget

AI助手前端组件 - 使用原生JavaScript开发，可集成到任何前端框架。

## 功能特性

- 悬浮聊天窗口（可展开/收起）
- Markdown消息渲染
- 与宿主系统通过CustomEvent通信
- 支持页面跳转、数据查询、快捷操作

## 使用方式

```html
<script src="admin-ai-widget.js"></script>
<script>
  new AdminAIWidget({
    apiUrl: 'https://your-api.com',
    position: 'bottom-right'
  })
</script>
```

## 开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```
