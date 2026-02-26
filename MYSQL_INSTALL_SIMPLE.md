# MySQL安装 - 简单方法

## 🎯 推荐方法：直接下载安装包（无需命令行工具）

### 步骤1：下载MySQL

1. 访问：https://dev.mysql.com/downloads/mysql/
2. 选择 "macOS" 版本
3. 下载 DMG 安装包（约500MB）
4. 不需要登录，点击 "No thanks, just start my download"

### 步骤2：安装

1. 双击下载的 `.dmg` 文件
2. 双击 `.pkg` 安装包
3. 按提示一路"继续"
4. **重要**：安装过程中会显示临时root密码，请记下来！
5. 完成安装

### 步骤3：启动MySQL

**方法A：系统偏好设置**
1. 打开"系统偏好设置"（或"系统设置"）
2. 找到"MySQL"图标（在最下方）
3. 点击"Start MySQL Server"

**方法B：命令行**
```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

### 步骤4：配置环境变量（可选）

为了方便使用mysql命令，添加到PATH：

```bash
# 编辑配置文件
nano ~/.zshrc

# 添加这一行
export PATH="/usr/local/mysql/bin:$PATH"

# 保存后重新加载
source ~/.zshrc
```

### 步骤5：修改root密码（如果需要）

```bash
# 使用安装时的临时密码登录
mysql -u root -p

# 在MySQL命令行中修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '你的新密码';
exit;
```

### 步骤6：创建项目数据库

```bash
# 登录MySQL
mysql -u root -p

# 在MySQL命令行中执行
source /Users/lifeng/Desktop/xiangmu/admin-little-ai/packages/admin-ai-service/database/schema.sql
source /Users/lifeng/Desktop/xiangmu/admin-little-ai/packages/admin-ai-service/database/seed.sql
exit;
```

---

## 🚀 方法2：使用Docker（最简单，无需安装）

如果你有Docker，这是最简单的方法：

```bash
# 启动MySQL容器
docker run -d \
  --name admin-ai-mysql \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -e MYSQL_DATABASE=admin_ai \
  -p 3306:3306 \
  mysql:8.0

# 等待几秒让MySQL启动完成
sleep 10

# 导入数据库
docker exec -i admin-ai-mysql mysql -uroot -p123456 admin_ai < packages/admin-ai-service/database/schema.sql
docker exec -i admin-ai-mysql mysql -uroot -p123456 admin_ai < packages/admin-ai-service/database/seed.sql
```

然后在 `.env` 文件中配置：
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_NAME=admin_ai
```

---

## 🔧 方法3：使用在线MySQL服务（无需本地安装）

使用免费的云MySQL服务：

### PlanetScale（推荐）
1. 访问 https://planetscale.com/
2. 注册免费账号
3. 创建数据库
4. 获取连接信息
5. 在 `.env` 中配置连接信息

### Railway
1. 访问 https://railway.app/
2. 注册账号
3. 创建MySQL服务
4. 获取连接信息

---

## ❓ 为什么Homebrew需要命令行工具？

Homebrew需要编译一些软件包，所以需要Xcode Command Line Tools提供的编译器。但是：
- **直接下载安装包**：不需要编译，直接安装
- **Docker**：容器化，不需要编译
- **云服务**：完全不需要本地安装

## 💡 我的建议

1. **如果你不想安装任何东西**：用Docker（如果有）或云服务
2. **如果想本地安装**：直接下载DMG安装包（最简单）
3. **如果以后要用Homebrew管理软件**：那就安装命令行工具

选择最适合你的方法即可！
