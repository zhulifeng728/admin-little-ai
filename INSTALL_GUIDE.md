# MySQL安装指南

## macOS安装步骤

### 方法1：使用Homebrew（推荐）

1. **安装Xcode Command Line Tools**（如果还没有）
   ```bash
   xcode-select --install
   ```
   会弹出安装窗口，点击"安装"并等待完成。

2. **安装MySQL**
   ```bash
   brew install mysql
   ```

3. **启动MySQL服务**
   ```bash
   brew services start mysql
   ```

4. **安全配置（可选但推荐）**
   ```bash
   mysql_secure_installation
   ```
   按提示设置root密码和其他安全选项。

5. **测试连接**
   ```bash
   mysql -u root -p
   ```

### 方法2：下载安装包

1. 访问 https://dev.mysql.com/downloads/mysql/
2. 选择macOS版本下载DMG安装包
3. 双击安装，按提示完成
4. 在系统偏好设置中启动MySQL服务

## 创建数据库

安装完成后，创建项目数据库：

```bash
# 登录MySQL
mysql -u root -p

# 在MySQL命令行中执行
source /Users/lifeng/Desktop/xiangmu/admin-little-ai/packages/admin-ai-service/database/schema.sql
source /Users/lifeng/Desktop/xiangmu/admin-little-ai/packages/admin-ai-service/database/seed.sql

# 或者直接在终端执行
mysql -u root -p < packages/admin-ai-service/database/schema.sql
mysql -u root -p < packages/admin-ai-service/database/seed.sql
```

## 验证安装

```bash
# 检查数据库是否创建成功
mysql -u root -p -e "USE admin_ai; SHOW TABLES;"
```

应该看到4张表：
- ai_models
- knowledge_base
- routes
- chat_history

## 常见问题

### Q: 提示"command not found: mysql"
A: MySQL未正确安装或未添加到PATH，重新安装或添加到环境变量

### Q: 无法连接到MySQL服务器
A: 检查MySQL服务是否启动：`brew services list`

### Q: 忘记root密码
A: 参考MySQL官方文档重置密码

---

# NVIDIA API配置指南

## 获取NVIDIA API密钥

1. 访问 https://build.nvidia.com/
2. 注册/登录NVIDIA账号
3. 选择一个模型（如Llama 3.1）
4. 点击"Get API Key"获取密钥

## 可用模型

NVIDIA提供多个开源模型：
- `meta/llama-3.1-8b-instruct` - Llama 3.1 8B（推荐）
- `meta/llama-3.1-70b-instruct` - Llama 3.1 70B
- `mistralai/mistral-7b-instruct-v0.3` - Mistral 7B
- `microsoft/phi-3-mini-128k-instruct` - Phi-3 Mini

## 配置步骤

1. **复制环境变量文件**
   ```bash
   cp packages/admin-ai-service/.env.example packages/admin-ai-service/.env
   ```

2. **编辑.env文件**
   ```bash
   nano packages/admin-ai-service/.env
   # 或使用你喜欢的编辑器
   ```

3. **填入NVIDIA配置**
   ```env
   PORT=3000

   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=你的MySQL密码
   DB_NAME=admin_ai

   # NVIDIA API
   NVIDIA_API_KEY=nvapi-你的密钥
   NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
   ```

4. **在配置后台设置**
   - 启动服务后访问 http://localhost:5173
   - 进入"AI模型配置"页面
   - 编辑NVIDIA模型配置
   - 填入你的API密钥
   - 点击"启用"

## API格式说明

NVIDIA的API兼容OpenAI格式，所以我们的代码已经支持！

请求示例：
```bash
curl https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer $NVIDIA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta/llama-3.1-8b-instruct",
    "messages": [{"role":"user","content":"你好"}],
    "temperature": 0.7,
    "max_tokens": 1024
  }'
```

## 优势

- ✅ 免费额度充足
- ✅ 多个开源模型可选
- ✅ 响应速度快
- ✅ 兼容OpenAI格式
- ✅ 无需科学上网

## 测试API

```bash
# 测试NVIDIA API是否可用
curl https://integrate.api.nvidia.com/v1/models \
  -H "Authorization: Bearer 你的密钥"
```

---

## 完整启动流程

1. ✅ 安装MySQL
2. ✅ 创建数据库
3. ✅ 配置.env文件（填入NVIDIA密钥）
4. ✅ 启动服务
   ```bash
   pnpm dev:service   # 后端
   pnpm dev:console   # 配置后台
   pnpm dev:widget    # 组件演示
   ```
5. ✅ 在配置后台启用NVIDIA模型
6. ✅ 测试AI助手

现在你可以使用NVIDIA的免费API了！
