# Email Extractor Pro

高效、隐私友好的邮箱提取工具，支持多语言界面。适用于市场营销、招聘、内容创作等多种场景。

## 主要功能
- 从任意文本中批量提取邮箱地址
- 支持去重、分组、排序、导出
- 完全本地处理，保障数据隐私
- 响应式设计，适配桌面与移动端
- 多语言支持：简体中文、繁体中文、英语、西班牙语、德语、葡萄牙语

## 多语言支持
可通过右上角下拉菜单一键切换界面语言。

## 安装与运行
1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发环境：
   ```bash
   npm run dev
   ```
3. 构建生产版本：
   ```bash
   npm run build
   ```

## 目录结构
```
src/
  components/      # 主要 React 组件
  locales/         # 多语言 JSON 文件
  i18n.ts          # 国际化配置
  ...
```

## 技术栈
- React + TypeScript
- Tailwind CSS
- react-i18next (国际化)
- Vite (构建工具)

## 贡献
欢迎提交 issue 或 PR 改进本项目。

## License
MIT 