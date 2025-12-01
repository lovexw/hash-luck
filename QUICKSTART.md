# ⚡ 快速开始

只需 5 分钟即可部署你自己的比特币幸运号码抽奖系统！

## 🎯 目标

完成后你将拥有：
- ✅ 每天自动更新的幸运号码
- ✅ 精美的前端展示页面
- ✅ 完整的历史记录
- ✅ 全球快速访问

## 📝 三步部署

### 第一步：Fork 仓库 (1 分钟)

1. 点击右上角 **Fork** 按钮
2. 等待 Fork 完成

### 第二步：配置 GitHub Actions (2 分钟)

1. 进入你 Fork 的仓库
2. 点击 **Settings** → **Actions** → **General**
3. 在 "Workflow permissions" 中选择：
   - ✅ **Read and write permissions**
4. 点击 **Save**
5. 前往 **Actions** 标签
6. 点击 **"I understand my workflows, go ahead and enable them"**
7. 选择 "Fetch Daily Bitcoin Block" 工作流
8. 点击 **Run workflow** 测试

### 第三步：部署前端 (2 分钟)

#### 选项 A: Cloudflare Pages (推荐，零配置)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 选择你的仓库 `hash-luck-daily-btc-lottery`
4. 配置：
   - **Build output directory**: `worker`
   - 其他留空
5. 点击 **Save and Deploy**
6. 完成！🎉

#### 选项 B: Wrangler CLI

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/hash-luck-daily-btc-lottery.git
cd hash-luck-daily-btc-lottery

# 安装依赖
npm install -g wrangler

# 登录
wrangler login

# 部署
npm run deploy
```

## 🔧 配置你的仓库信息

部署后，更新前端配置：

1. 编辑 `worker/index.html`
2. 找到第 288 行：
   ```javascript
   const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/data';
   ```
3. 替换为：
   ```javascript
   const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/你的用户名/hash-luck-daily-btc-lottery/main/data';
   ```
4. 提交修改：
   ```bash
   git add worker/index.html
   git commit -m "chore: 更新仓库配置"
   git push
   ```

## ✅ 验证

访问你的网站（Cloudflare 提供的 URL），你应该能看到：

- 🎲 今日幸运号码（Lucky 3 和 Lucky 6）
- 📦 区块信息
- 📜 历史记录

## 🎨 自定义（可选）

### 修改颜色主题

编辑 `worker/index.html` 中的 CSS：

```css
/* 渐变背景 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 幸运号码卡片颜色 */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### 添加自定义域名

1. 在 Cloudflare Pages 项目中
2. **Custom domains** → **Set up a custom domain**
3. 输入域名并配置 DNS

## 📅 定时任务

系统会在每天**北京时间 12:15**自动运行并生成当天的幸运号码。

你也可以手动触发：
1. **Actions** 标签
2. 选择 "Fetch Daily Bitcoin Block"
3. **Run workflow**

## 🆘 遇到问题？

### 前端显示错误

1. 确认 GitHub Actions 已成功运行
2. 检查 `data/` 目录是否有数据文件
3. 验证 `GITHUB_RAW_BASE` 配置正确

### Actions 权限错误

确保在 Settings → Actions 中启用了 "Read and write permissions"

### 更多帮助

查看完整文档：
- [README.md](README.md) - 完整说明
- [DEPLOYMENT.md](DEPLOYMENT.md) - 详细部署指南
- [GitHub Issues](../../issues) - 问题反馈

## 🎉 完成！

恭喜！你的比特币幸运号码抽奖系统已成功部署。

每天 12:15 后访问你的网站，查看新的幸运号码！

---

⭐ 觉得有用？给个 Star 吧！
