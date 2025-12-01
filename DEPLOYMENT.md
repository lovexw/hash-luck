# 🚀 部署指南

本文档提供详细的部署步骤，帮助你将 Hash-Luck 项目部署到生产环境。

## 📋 前置要求

- GitHub 账号
- Cloudflare 账号（免费账号即可）
- Git 基础知识

## 🔧 步骤一：Fork 和克隆仓库

### 1.1 Fork 仓库

1. 访问项目 GitHub 页面
2. 点击右上角的 "Fork" 按钮
3. 等待 Fork 完成

### 1.2 克隆到本地

```bash
git clone https://github.com/YOUR_USERNAME/hash-luck-daily-btc-lottery.git
cd hash-luck-daily-btc-lottery
```

## ⚙️ 步骤二：配置 GitHub Actions

### 2.1 启用 Actions 权限

1. 前往你的 GitHub 仓库页面
2. 点击 **Settings** → **Actions** → **General**
3. 在 "Workflow permissions" 部分：
   - 选择 **"Read and write permissions"**
   - 勾选 **"Allow GitHub Actions to create and approve pull requests"**
4. 点击 **Save**

### 2.2 测试工作流

1. 前往 **Actions** 标签页
2. 选择 "Fetch Daily Bitcoin Block" 工作流
3. 点击 **"Run workflow"** → **"Run workflow"**
4. 等待工作流运行完成（约 30 秒）
5. 检查 `data/` 目录是否生成了 JSON 文件

## 🌐 步骤三：部署到 Cloudflare Pages

### 方式一：通过 Cloudflare Dashboard（推荐）

#### 3.1 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧菜单的 **Workers & Pages**
3. 点击 **Create application** → **Pages** → **Connect to Git**

#### 3.2 连接 GitHub

1. 点击 **Connect GitHub**
2. 授权 Cloudflare 访问你的 GitHub
3. 选择你 Fork 的仓库 `hash-luck-daily-btc-lottery`

#### 3.3 配置构建设置

- **Project name**: `hash-luck` (或任意名称)
- **Production branch**: `main`
- **Build command**: 留空
- **Build output directory**: `worker`

#### 3.4 部署

1. 点击 **Save and Deploy**
2. 等待部署完成（约 1-2 分钟）
3. 你会获得一个 URL，如：`https://hash-luck.pages.dev`

### 方式二：使用 Wrangler CLI

#### 3.5 安装 Wrangler

```bash
npm install -g wrangler
```

#### 3.6 登录 Cloudflare

```bash
wrangler login
```

这会打开浏览器窗口进行授权。

#### 3.7 部署

```bash
npm run deploy
```

## 🔄 步骤四：更新前端配置

### 4.1 编辑 HTML 文件

打开 `worker/index.html`，找到以下行：

```javascript
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/data';
```

替换为你的实际信息：

```javascript
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/你的用户名/hash-luck-daily-btc-lottery/main/data';
```

### 4.2 提交修改

```bash
git add worker/index.html
git commit -m "chore: 更新 GitHub 仓库配置"
git push origin main
```

### 4.3 重新部署

如果使用 Cloudflare Pages，推送到 main 分支后会自动重新部署。

如果使用 Wrangler CLI：

```bash
npm run deploy
```

## ✅ 步骤五：验证部署

### 5.1 检查数据生成

1. 前往 GitHub 仓库的 `data/` 目录
2. 确认存在今天的 JSON 文件（如 `2025-12-01.json`）
3. 检查 `history.json` 文件

### 5.2 访问前端

1. 打开 Cloudflare Pages 提供的 URL
2. 检查是否正确显示今日幸运号码
3. 滚动到历史记录部分，确认数据加载正常

### 5.3 测试定时任务

定时任务会在每天北京时间 12:15 自动运行。你可以：

1. 等待第二天自动运行
2. 或手动触发：前往 GitHub Actions → 选择工作流 → Run workflow

## 🎨 可选：自定义域名

### 6.1 添加自定义域名

1. 在 Cloudflare Dashboard 中找到你的 Pages 项目
2. 点击 **Custom domains** 标签
3. 点击 **Set up a custom domain**
4. 输入你的域名（如 `lottery.example.com`）
5. 按照提示配置 DNS 记录

## 🔍 故障排除

### 问题 1: GitHub Actions 权限错误

**错误信息**: "Resource not accessible by integration"

**解决方案**:
1. 前往仓库 Settings → Actions → General
2. 确保选择了 "Read and write permissions"

### 问题 2: 前端无法加载数据

**可能原因**:
- `GITHUB_RAW_BASE` 配置错误
- 数据文件未生成

**解决方案**:
1. 检查 `worker/index.html` 中的 `GITHUB_RAW_BASE` 配置
2. 手动运行 GitHub Actions 生成数据
3. 在浏览器开发者工具中查看网络请求

### 问题 3: Wrangler 部署失败

**解决方案**:
```bash
# 重新登录
wrangler logout
wrangler login

# 清除缓存
rm -rf node_modules package-lock.json
npm install

# 重试部署
npm run deploy
```

## 📊 监控和维护

### 定期检查

- 每周检查 GitHub Actions 运行状态
- 确认数据正常生成
- 监控 Cloudflare Pages 访问统计

### 更新项目

```bash
# 拉取最新代码
git pull origin main

# 安装新依赖
npm install

# 重新部署
npm run deploy
```

## 🆘 获取帮助

如果遇到问题：

1. 查看 [README.md](README.md)
2. 搜索 [GitHub Issues](../../issues)
3. 创建新的 Issue 并附上详细信息

## 🎉 完成！

恭喜！你已成功部署 Hash-Luck 项目。

访问你的网站，享受每日比特币幸运号码抽奖！

---

如有问题，欢迎在 GitHub 上提出 Issue。
