# 贡献指南

感谢你对 Hash-Luck 项目的关注！我们欢迎任何形式的贡献。

## 🐛 报告问题

如果你发现了 bug 或有功能建议，请：

1. 搜索现有的 [Issues](../../issues) 确保问题未被报告
2. 创建新的 Issue，提供以下信息：
   - 清晰的标题
   - 详细的问题描述
   - 复现步骤（如果是 bug）
   - 期望的行为
   - 实际的行为
   - 截图（如果适用）

## 💡 提交功能建议

我们欢迎新功能建议！请创建 Issue 并包含：

- 功能描述
- 使用场景
- 预期效果
- 可能的实现方案（可选）

## 🔧 提交代码

### 开发流程

1. **Fork 仓库**
   ```bash
   # 点击 GitHub 页面右上角的 "Fork" 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hash-luck-daily-btc-lottery.git
   cd hash-luck-daily-btc-lottery
   ```

3. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **进行修改**
   - 遵循现有代码风格
   - 添加必要的注释
   - 确保代码可读性

5. **测试你的修改**
   ```bash
   # 测试数据获取脚本
   npm run fetch
   
   # 测试前端
   npm run dev
   ```

6. **提交修改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   ```

7. **推送到你的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **创建 Pull Request**
   - 前往原仓库
   - 点击 "New Pull Request"
   - 选择你的分支
   - 填写 PR 描述

### 提交信息规范

使用语义化提交信息：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式调整（不影响功能）
- `refactor:` 代码重构
- `test:` 添加测试
- `chore:` 构建/工具配置

示例：
```
feat: 添加区块高度趋势图
fix: 修复历史记录分页问题
docs: 更新部署文档
```

## 📋 代码规范

### JavaScript

- 使用 ES6+ 语法
- 使用 2 空格缩进
- 使用单引号
- 适当添加注释
- 函数和变量使用驼峰命名

### HTML/CSS

- 语义化 HTML
- CSS 类名使用短横线命名
- 保持样式模块化

## ✅ Pull Request 检查清单

在提交 PR 前，请确保：

- [ ] 代码遵循项目规范
- [ ] 已测试所有修改
- [ ] 更新了相关文档
- [ ] 提交信息清晰明确
- [ ] PR 描述完整

## 🤔 需要帮助？

如果你在贡献过程中遇到问题：

1. 查看 [README.md](README.md)
2. 搜索现有 Issues
3. 创建新 Issue 寻求帮助

## 📄 许可证

贡献的代码将采用与项目相同的 MIT 许可证。

---

再次感谢你的贡献！ 🎉
