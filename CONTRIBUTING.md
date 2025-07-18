# 🤝 贡献指南

感谢你对Augment自动续杯工具的关注！我们欢迎所有形式的贡献。

## 🚀 如何贡献

### 报告问题

如果你发现了bug或有功能建议：

1. 检查 [Issues](https://github.com/getwName/augment-auto-refill/issues) 确保问题未被报告
2. 使用合适的Issue模板创建新Issue
3. 提供详细的描述和复现步骤

### 提交代码

1. **Fork仓库**
   ```bash
   git clone https://github.com/getwName/augment-auto-refill.git
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **开发和测试**
   ```bash
   npm install
   npm run dev
   npm run test
   ```

4. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **推送并创建PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 代码规范

### 提交信息格式

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型说明：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(ui): add dark mode support
fix(auth): resolve login timeout issue
docs: update installation guide
```

### 代码风格

- 使用 ESLint 进行代码检查
- 遵循 JavaScript Standard Style
- 函数和变量使用驼峰命名
- 常量使用大写下划线命名
- 添加适当的注释

### 文件结构

```
src/
├── content.js          # 主要逻辑，保持模块化
├── background.js       # 后台脚本，最小化功能
├── ui/                 # 用户界面相关
│   ├── popup.html
│   └── popup.js
└── utils/              # 工具函数
    ├── email.js
    ├── dom.js
    └── logger.js
```

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- --grep "email generation"

# 生成覆盖率报告
npm run test:coverage
```

### 测试要求

- 新功能必须包含测试
- 测试覆盖率不低于80%
- 包含单元测试和集成测试

## 📚 文档

### 更新文档

- 新功能需要更新README.md
- API变更需要更新相关文档
- 添加代码注释说明复杂逻辑

### 文档风格

- 使用清晰简洁的语言
- 提供代码示例
- 包含截图或动图演示

## 🔍 代码审查

### PR要求

- [ ] 代码通过所有测试
- [ ] 遵循代码规范
- [ ] 包含适当的文档
- [ ] 功能完整且稳定
- [ ] 无明显性能问题

### 审查流程

1. 自动化检查（CI/CD）
2. 代码审查（至少1个维护者）
3. 功能测试
4. 合并到主分支

## 🎯 开发优先级

### 高优先级
- 🐛 Bug修复
- 🔒 安全问题
- 📱 兼容性问题

### 中优先级
- ✨ 新功能
- 🎨 UI/UX改进
- ⚡ 性能优化

### 低优先级
- 📝 文档完善
- 🧹 代码清理
- 🔧 开发工具改进

## 💬 交流

- 💬 [GitHub Discussions](https://github.com/getwName/augment-auto-refill/discussions) - 一般讨论
- 🐛 [GitHub Issues](https://github.com/getwName/augment-auto-refill/issues) - Bug报告和功能请求
- 📧 Email: 109057226+getwName@users.noreply.github.com - 私人联系

## 🌟 贡献者

感谢所有为项目做出贡献的开发者！

### 如何成为贡献者

1. **提交有价值的PR** - 代码改进、功能添加、文档完善
2. **报告重要Bug** - 帮助发现和修复问题
3. **参与讨论** - 在Issues和Discussions中积极参与
4. **推广项目** - 帮助更多人了解和使用

### 贡献者权益

- 🏆 **贡献者徽章** - 在README中展示
- 🎁 **优先支持** - 问题优先处理
- 📢 **项目推广** - 帮助推广你的其他项目
- 🤝 **技术交流** - 与维护者直接技术交流

## 📄 许可证

通过贡献代码，你同意你的贡献将在 [MIT License](LICENSE) 下发布。

---

再次感谢你的贡献！🎉