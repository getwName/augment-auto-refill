# 🚀 Augment自动续杯工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/getwName/augment-auto-refill)

> 🎯 一个智能的Chrome浏览器扩展，专为Augment平台设计的自动注册续杯工具。通过用户协助验证模式，实现从邮箱生成到验证码处理的全流程自动化。

## ✨ 特性

- 🤖 **智能自动化** - 自动生成邮箱、填写表单、处理验证码
- 🛡️ **现代验证兼容** - 支持Cloudflare Bot Management等现代验证系统
- 👥 **用户协助模式** - 用户处理验证，插件处理自动化流程
- 🎨 **友好界面** - 清晰的操作指引和实时状态反馈
- ⚙️ **灵活配置** - 可自定义邮箱域名和前缀长度
- 🔄 **智能重试** - 多层备用方案确保成功率
- 📝 **详细日志** - 完整的操作日志便于调试

## 🎬 演示

> 📹 **演示视频**：将在此处添加功能演示视频

*用户只需手动完成验证，其余流程全自动化*

## 🚀 快速开始

### 安装

#### 方法一：从源码安装（推荐）

1. **克隆仓库**
   ```bash
   git clone https://github.com/getwName/augment-auto-refill.git
   cd augment-auto-refill
   ```

2. **构建扩展**
   ```bash
   npm install
   npm run build
   ```

3. **加载到Chrome**
   - 打开Chrome浏览器
   - 访问 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目的 `dist` 文件夹

#### 方法二：下载预构建版本

[![下载最新版本](https://img.shields.io/badge/下载-最新版本-blue.svg)](https://github.com/getwName/augment-auto-refill/releases/tag/1.0.0%E7%89%88%E6%9C%AC)

1. **直接下载**：[点击下载 Augment自动续杯工具.zip](https://github.com/getwName/augment-auto-refill/releases/tag/1.0.0%E7%89%88%E6%9C%AC)
2. **或访问** [Releases页面](https://github.com/getwName/augment-auto-refill/releases) 选择版本
3. 解压下载的ZIP文件
4. 在Chrome扩展页面加载解压后的文件夹

### 配置

#### 第一步：打开设置页面
1. **安装扩展后**，在Chrome工具栏找到扩展图标
2. **点击扩展图标** 打开设置页面

#### 第二步：配置参数

**配置项说明**：
- **注册域名邮箱**：用来注册Augment的邮箱后缀，如 `@gmail.com`
- **临时邮箱用户名**：接收验证码的临时邮箱用户名
- **临时邮箱后缀**：临时邮箱服务域名，推荐 `@tempmail.plus`
- **PIN码**：查询验证码的标识码
- **随机字符串位数**：注册邮箱前缀长度，推荐6位（默认12位太长易失败）

**推荐配置**：
```
注册域名邮箱: @gmail.com
临时邮箱用户名: testuser
临时邮箱后缀: @tempmail.plus
PIN码: abc123
随机字符串位数: 6
```

#### 第三步：保存设置
1. **填写完成后**点击"保存设置"按钮
2. **看到成功提示**即表示配置完成
3. **现在可以使用**自动续杯功能

## 📖 使用指南

### 基本使用流程

1. **访问Augment登录页面**
   - 页面加载后会自动显示操作提示

2. **完成验证**
   - 根据提示先完成页面上的验证（如Cloudflare验证）

3. **点击续杯按钮**
   - 点击页面上的"续杯"按钮开始自动流程

4. **等待完成**
   - 插件会自动处理邮箱填写、验证码获取、表单提交等

### 详细操作步骤

```
📋 操作步骤：
1️⃣ 先完成页面上的验证（点击"我不是机器人"等）
2️⃣ 然后点击"续杯"按钮开始自动注册
💡 验证码部分将自动处理
```

### 支持的验证系统

- ✅ Cloudflare Bot Management
- ✅ Private Access Token验证
- ✅ PostHog行为分析
- ✅ 沙盒安全框架
- ✅ 传统人机验证

## ⚙️ 配置选项

| 配置项 | 说明 | 推荐值 | 示例 |
|--------|------|--------|------|
| **注册域名邮箱** | 用来注册Augment的邮箱后缀 | `@gmail.com` | `@gmail.com`、`@outlook.com` |
| **临时邮箱用户名** | 接收验证码的临时邮箱用户名 | 简短易记 | `testuser`、`myemail` |
| **临时邮箱后缀** | 临时邮箱服务域名 | `@tempmail.plus` | `@tempmail.plus` |
| **PIN码** | 查询验证码的标识码 | 简短字符串 | `abc123`、`test01` |
| **随机字符串位数** | 注册邮箱前缀长度（默认12） | 6位 | `5`、`6`、`7` |

**⚠️ 重要提示**：
- 随机字符串位数推荐**7个以内**，太长容易注册失败
- Gmail兼容性最好，tempmail.plus服务最稳定

## 🛠️ 开发

### 环境要求

- Node.js 16+
- Chrome 88+

### 本地开发

```bash
# 克隆项目
git clone https://github.com/getwName/augment-auto-refill.git
cd augment-auto-refill

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 打包扩展
npm run package
```

### 项目结构

```
src/
├── manifest.json          # 扩展配置文件
├── content.js             # 内容脚本（主要逻辑）
├── background.js          # 后台脚本
├── augmentVIP.html        # 设置页面
├── augmentVIP.js          # 设置页面逻辑
└── icon-*.png            # 扩展图标
```

### 技术特点

- **内容脚本注入** - 在目标页面执行自动化逻辑
- **DOM事件模拟** - 模拟真实用户操作  
- **智能重试机制** - 多层备用方案确保成功率
- **异步流程控制** - Promise-based的流程管理

## 🔧 常见问题

**Q: 扩展无法加载？**  
A: 确保Chrome版本 >= 88，开启开发者模式

**Q: 验证码获取失败？**  
A: 检查网络连接，确保临时邮箱服务可访问

**Q: 自动填写不工作？**  
A: 刷新页面重试，确保页面完全加载

**Q: 如何查看日志？**  
A: 按F12打开控制台查看详细日志

## 🔒 隐私与安全

- ✅ **本地处理** - 所有数据在本地处理，不上传到远程服务器
- ✅ **最小权限** - 仅请求必要的浏览器权限
- ✅ **开源透明** - 代码完全开源，可审查安全性
- ✅ **无数据收集** - 不收集任何用户个人信息

## 📊 兼容性

| 浏览器 | 版本要求 | 支持状态 |
|--------|----------|----------|
| Chrome | 88+ | ✅ 完全支持 |
| Edge | 88+ | ✅ 完全支持 |
| Firefox | - | ❌ 暂不支持 |
| Safari | - | ❌ 暂不支持 |

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md) 了解详情。

### 贡献方式

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 遵循 ESLint 代码规范
- 添加适当的注释和文档
- 确保所有功能都有对应的测试
- 提交前运行 `npm run lint` 检查代码

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢 [Augment](https://augmentcode.com) 提供优秀的开发平台
- 感谢所有贡献者的支持和反馈

## 📞 支持

如果你遇到问题或有建议，请：

- 📝 [提交Issue](https://github.com/getwName/augment-auto-refill/issues)
- 💬 [参与讨论](https://github.com/getwName/augment-auto-refill/discussions)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**

Made with ❤️ by [getwName](https://github.com/getwName)

</div>