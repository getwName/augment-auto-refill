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

[![下载最新版本](https://img.shields.io/badge/下载-最新版本-blue.svg)](https://github.com/getwName/augment-auto-refill/releases/latest/download/Augment自动续杯工具.zip)

1. **直接下载**：[点击下载 Augment自动续杯工具.zip](https://github.com/getwName/augment-auto-refill/releases/latest/download/Augment自动续杯工具.zip)
2. **或访问** [Releases页面](https://github.com/getwName/augment-auto-refill/releases) 选择版本
3. 解压下载的ZIP文件
4. 在Chrome扩展页面加载解压后的文件夹

### 配置

1. **点击扩展图标** 打开设置页面
2. **配置邮箱设置**：
   - 邮箱域名：如 `@gmail.com`
   - 随机长度：邮箱前缀位数（默认10位）
3. **保存设置**

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

## ⚙️ 配置选项

| 配置项 | 说明 | 默认值 | 示例 |
|--------|------|--------|------|
| 邮箱域名 | 生成邮箱的后缀 | 无 | `@gmail.com` |
| 随机长度 | 邮箱前缀的字符数 | 10 | `8` |

### 配置示例

```json
{
  "emailDomain": "@gmail.com",
  "randomLength": "10"
}
```

生成结果：`A7k9Xm2Pq1@gmail.com`

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

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持

如果你遇到问题或有建议，请：

- 📝 [提交Issue](https://github.com/getwName/augment-auto-refill/issues)
- 💬 [参与讨论](https://github.com/getwName/augment-auto-refill/discussions)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**

Made with ❤️ by [getwName](https://github.com/getwName)

</div>