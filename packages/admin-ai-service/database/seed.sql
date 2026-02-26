USE admin_ai;

-- 插入示例AI模型配置
INSERT INTO ai_models (name, provider, api_key, base_url, model, is_active) VALUES
('NVIDIA Llama 3.1', 'nvidia', 'your-nvidia-api-key-here', 'https://integrate.api.nvidia.com/v1', 'meta/llama-3.1-8b-instruct', 1),
('OpenAI GPT-3.5', 'openai', 'your-openai-api-key-here', 'https://api.openai.com/v1', 'gpt-3.5-turbo', 0);

-- 插入示例知识库
INSERT INTO knowledge_base (title, content, category, related_routes) VALUES
('用户管理功能指引', '# 用户管理\n\n## 查看用户列表\n\n您可以在用户管理页面查看所有用户信息，支持搜索和筛选功能。\n\n## 添加新用户\n\n点击"添加用户"按钮，填写用户信息后提交即可。', 'guide', '["\/user\/list", "\/user\/add"]'),
('系统设置说明', '# 系统设置\n\n## 基础配置\n\n在系统设置页面可以配置系统的基本参数。', 'guide', '["\/settings"]'),
('常见问题', '# 常见问题\n\n## 如何重置密码？\n\n请联系管理员重置密码。', 'faq', NULL);

-- 插入示例路由配置
INSERT INTO routes (path, name, description) VALUES
('/user/list', '用户列表', '查看和管理所有用户，支持搜索、筛选和批量操作'),
('/user/add', '添加用户', '创建新用户账号'),
('/user/edit/:id', '编辑用户', '修改用户信息'),
('/settings', '系统设置', '配置系统基本参数'),
('/dashboard', '仪表盘', '查看系统概览和统计数据');
