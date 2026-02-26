# 快速启动指南

## 前提条件

1. **Node.js**: 已安装 ✅
2. **pnpm**: 已安装 ✅
3. **MySQL**: 需要安装 ⚠️

## 安装MySQL

### macOS
```bash
# 使用Homebrew安装
brew install mysql

# 启动MySQL服务
brew services start mysql

# 设置root密码（可选）
mysql_secure_installation
```

### 其他系统
- Windows: 下载安装 https://dev.mysql.com/downloads/mysql/
- Linux: `sudo apt-get install mysql-server` 或 `sudo yum install mysql-server`

## 完整启动流程

### 1. 安装依赖（已完成 ✅）

```bash
pnpm install
```

### 2. 创建数据库

```bash
# 登录MySQL
mysql -u root -p

# 创建数据库和表
source packages/admin-ai-service/database/schema.sql

# 插入示例数据
source packages/admin-ai-service/database/seed.sql

# 退出
exit
```

或者直接执行：
```bash
mysql -u root -p < packages/admin-ai-service/database/schema.sql
mysql -u root -p < packages/admin-ai-service/database/seed.sql
```

### 3. 配置环境变量

```bash
# 复制环境变量模板
cp packages/admin-ai-service/.env.example packages/admin-ai-service/.env

# 编辑.env文件，填入你的配置
# 重点：DB_PASSWORD 和 OPENAI_API_KEY
```

### 4. 启动服务

打开3个终端窗口：

**终端1 - 后端服务**
```bash
pnpm dev:service
# 访问: http://localhost:3000
```

**终端2 - 配置后台**
```bash
pnpm dev:console
# 访问: http://localhost:5173
```

**终端3 - 组件演示**
```bash
cd packages/admin-ai-widget
pnpm dev
# 访问: http://localhost:5174/demo.html
```

## 测试流程

### 1. 配置AI模型
1. 访问 http://localhost:5173
2. 进入"AI模型配置"页面
3. 编辑默认的OpenAI配置，填入你的API密钥
4. 点击"启用"按钮

### 2. 查看知识库
1. 进入"知识库管理"页面
2. 查看已有的示例知识库
3. 可以添加新的知识库文档

### 3. 查看路由配置
1. 进入"路由配置"页面
2. 查看已配置的示例路由
3. 可以添加你自己系统的路由

### 4. 测试AI助手
1. 访问 http://localhost:5174/demo.html
2. 点击右下角的AI助手按钮
3. 尝试提问：
   - "如何查看用户列表？"
   - "怎么添加新用户？"
   - "系统设置在哪里？"
4. 点击回答中的链接，查看控制台的导航事件

## 无数据库快速测试

如果暂时没有MySQL，可以先测试前端组件UI：

```bash
cd packages/admin-ai-widget
pnpm dev
# 访问 http://localhost:5174/demo.html
```

注意：没有后端服务，发送消息会失败，但可以看到UI效果。

## 常见问题

### Q: MySQL连接失败
A: 检查.env文件中的数据库配置是否正确

### Q: AI回答失败
A: 检查OpenAI API密钥是否正确，网络是否可访问OpenAI

### Q: 端口被占用
A: 修改对应项目的配置文件中的端口号

## 下一步

系统运行后，你可以：
1. 在配置后台添加更多知识库内容
2. 配置你自己系统的路由
3. 将AI助手组件集成到你的后台系统
4. 开发第二阶段功能：数据查询和展示

## 集成到你的系统

构建组件：
```bash
pnpm build:widget
```

在你的HTML中引入：
```html
<script src="dist/admin-ai-widget.umd.js"></script>
<script>
  new AdminAIWidget({
    apiUrl: 'http://your-domain.com/api',
    position: 'bottom-right'
  })

  window.addEventListener('ai-assistant-navigate', (e) => {
    // 使用你的路由进行跳转
    yourRouter.push(e.detail.path)
  })
</script>
```
