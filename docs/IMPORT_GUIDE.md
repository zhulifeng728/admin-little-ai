# 导入功能使用指南

## 知识库导入

### JSON格式

知识库导入支持JSON格式，可以是单个对象或对象数组。

**单个知识库：**
```json
{
  "title": "用户管理功能指引",
  "content": "# 用户管理\n\n## 查看用户列表\n\n您可以在用户管理页面查看所有用户信息。",
  "category": "guide",
  "related_routes": ["/user/list", "/user/add"]
}
```

**批量导入（数组）：**
```json
[
  {
    "title": "知识库1",
    "content": "内容1",
    "category": "guide",
    "related_routes": ["/path1"]
  },
  {
    "title": "知识库2",
    "content": "内容2",
    "category": "faq",
    "related_routes": []
  }
]
```

### 字段说明

- `title` (必填): 知识库标题
- `content` (必填): Markdown格式的内容
- `category` (可选): 分类，可选值：`guide`（功能指引）、`faq`（常见问题）、`api`（API文档）
- `related_routes` (可选): 关联的路由路径数组

### 使用步骤

1. 准备JSON文件（参考 `examples/knowledge-import-example.json`）
2. 在配置后台进入"知识库管理"页面
3. 点击"导入JSON"按钮
4. 选择JSON文件
5. 系统会显示导入结果（成功数量、失败数量）

---

## 路由配置导入

### JSON格式

路由配置导入支持JSON格式，可以是单个对象或对象数组。

**单个路由：**
```json
{
  "path": "/user/list",
  "name": "用户列表",
  "description": "查看和管理所有用户"
}
```

**批量导入（数组）：**
```json
[
  {
    "path": "/user/list",
    "name": "用户列表",
    "description": "查看和管理所有用户"
  },
  {
    "path": "/user/add",
    "name": "添加用户",
    "description": "创建新用户账号"
  }
]
```

### 字段说明

- `path` (必填): 路由路径，如 `/user/list`
- `name` (必填): 页面名称
- `description` (可选): 页面功能描述

### 使用步骤

1. 准备JSON文件（参考 `examples/routes-import-example.json`）
2. 在配置后台进入"路由配置"页面
3. 点击"导入JSON"按钮
4. 选择JSON文件
5. 系统会显示导入结果（成功数量、失败数量）

---

## 示例文件

项目提供了两个示例文件：

- `examples/knowledge-import-example.json` - 知识库导入示例
- `examples/routes-import-example.json` - 路由配置导入示例

你可以直接使用这些文件测试导入功能，或者参考它们的格式创建自己的导入文件。

---

## 注意事项

1. **文件格式**：必须是有效的JSON格式
2. **编码**：建议使用UTF-8编码
3. **路由唯一性**：路由路径必须唯一，重复的路径会导入失败
4. **Markdown内容**：知识库内容支持完整的Markdown语法
5. **批量导入**：一次可以导入多条记录，系统会逐条处理
6. **错误处理**：如果某条记录导入失败，不会影响其他记录的导入

---

## API接口

如果需要通过API导入，可以使用以下接口：

**知识库导入：**
```bash
POST /api/knowledge/import
Content-Type: application/json

{
  "items": [
    {
      "title": "标题",
      "content": "内容",
      "category": "guide",
      "related_routes": []
    }
  ]
}
```

**路由配置导入：**
```bash
POST /api/routes/import
Content-Type: application/json

{
  "items": [
    {
      "path": "/path",
      "name": "名称",
      "description": "描述"
    }
  ]
}
```

**响应格式：**
```json
{
  "message": "导入完成",
  "total": 10,
  "success": 9,
  "failed": 1,
  "results": [
    {
      "success": true,
      "id": 1,
      "title": "标题"
    },
    {
      "success": false,
      "title": "标题2",
      "error": "错误信息"
    }
  ]
}
```
