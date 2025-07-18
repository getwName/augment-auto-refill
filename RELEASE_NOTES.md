# 🚀 Augment自动续杯工具 v1.0.0

## ✨ 新功能

- 🤖 **智能自动化注册** - 一键完成Augment平台注册流程
- 🛡️ **现代验证系统兼容** - 支持Cloudflare Bot Management等验证
- 👥 **用户协助验证模式** - 用户处理验证，插件处理自动化
- 🎨 **友好用户界面** - 清晰的操作指引和实时状态反馈
- ⚙️ **灵活配置选项** - 可自定义邮箱域名和前缀长度
- 🔄 **智能重试机制** - 多层备用方案确保成功率
- 📝 **详细操作日志** - 完整的调试信息

## 📦 安装方式

### 方法一：直接安装（推荐）
1. 下载 `Augment自动续杯工具.zip`
2. 解压到任意文件夹
3. 打开Chrome浏览器，访问 `chrome://extensions/`
4. 开启"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择解压后的文件夹

### 方法二：从源码构建
```bash
git clone https://github.com/getwName/augment-auto-refill.git
cd augment-auto-refill
npm install
npm run build
```

## 🎯 使用说明

1. **访问Augment登录页面**
2. **完成页面验证**（如Cloudflare验证）
3. **点击"续杯"按钮**
4. **等待自动完成注册**

## ⚙️ 配置要求

- Chrome 88+ 或 Edge 88+
- 需要配置邮箱域名（如 @gmail.com）
- 建议配置前缀长度（默认10位）

## 🔧 技术特性

- 支持现代验证系统绕过
- 智能页面状态检测
- 自动验证码处理
- 多重错误处理机制
- 完整的日志记录

## 🐛 已知问题

- 暂不支持Firefox和Safari
- 需要手动完成初始验证步骤

## 📞 支持

如遇问题请：
- 提交Issue: https://github.com/getwName/augment-auto-refill/issues
- 查看文档: https://github.com/getwName/augment-auto-refill#readme

---

**感谢使用Augment自动续杯工具！** 🎉