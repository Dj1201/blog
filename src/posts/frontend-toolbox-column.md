---
title: "前端工具模块手册：开发、调试、构建、质量与效率工具"
date: "2026-04-30"
category: "工具与资源"
tags:
  - 前端工具
  - 工程化
  - 调试
  - 前端
excerpt: "整理前端常用工具链：编辑器、DevTools、包管理器、构建工具、接口调试、质量检查、在线演示和性能分析。"
---

前端工具链的目标不是“装很多工具”，而是让开发、调试、构建、协作和交付更稳定。查询工具时，可以先按任务分类：写代码、跑项目、调接口、查性能、管依赖、保质量、做演示。

## 编辑器

### VS Code

常用能力：

- 文件搜索。
- 全局代码搜索。
- 集成终端。
- Git diff。
- 调试断点。
- TypeScript 类型提示。
- 插件扩展。

常用插件方向：

- Vue 语法支持。
- ESLint。
- Prettier。
- GitLens。
- CSS 变量提示。
- 路径提示。

插件不宜过多，优先保留真实高频使用的。

## 浏览器调试工具

### Chrome DevTools

常用面板：

- Elements：DOM、样式、盒模型。
- Console：报错、日志、临时代码。
- Network：接口、资源、缓存、耗时。
- Performance：性能录制、长任务、渲染。
- Application：Cookie、Storage、Cache、Service Worker。
- Lighthouse：性能、可访问性、最佳实践、SEO。

快速排查对应关系：

- 样式不对：Elements。
- 接口失败：Network。
- 页面卡顿：Performance。
- 缓存不更新：Network + Application。
- 登录态异常：Application 的 Cookie 和 Storage。

## 包管理器

### npm

常用命令：

```bash
npm install
npm run dev
npm run build
npm outdated
npm audit
```

### yarn

当前项目使用 yarn：

```bash
yarn install
yarn dev
yarn build
```

### pnpm

特点：

- 磁盘复用效率高。
- 安装速度快。
- 依赖结构更严格。

项目协作原则：

- 仓库里有什么 lock 文件，就优先用对应包管理器。
- 不要混用 `package-lock.json`、`yarn.lock`、`pnpm-lock.yaml`。
- 新增依赖前先判断是否必要。

## package.json

常见字段：

- `scripts`：项目命令。
- `dependencies`：生产依赖。
- `devDependencies`：开发依赖。
- `type`：模块类型，例如 `module`。
- `engines`：Node 版本要求。

脚本示例：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 构建工具

### Vite

适合现代前端项目。

常见能力：

- 快速开发服务器。
- 热更新。
- 静态资源处理。
- 环境变量。
- 生产构建。
- 插件扩展。

常见配置：

```js
export default defineConfig({
  base: '/blog/',
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'https://api.example.com',
    },
  },
});
```

常见问题：

- 线上资源 404：检查 `base`。
- 本地接口跨域：配置 `server.proxy`。
- 环境变量不生效：Vite 客户端变量需以 `VITE_` 开头。

### Webpack

很多老项目仍然使用 Webpack。重点概念：

- entry
- output
- loader
- plugin
- devServer
- code splitting

如果维护老项目，需要能看懂 loader 和 plugin 的职责。

## 代码质量工具

### ESLint

用于发现潜在代码问题。

常见检查：

- 未使用变量。
- 不安全写法。
- 框架规则。
- Hooks 或组件规则。
- 导入顺序。

### Prettier

用于统一代码格式。

它不关心逻辑，只关心格式。团队里最好让格式自动化，不要人工争论缩进和换行。

### Stylelint

用于检查 CSS、SCSS、Vue style 等样式规则。

适合：

- 统一属性顺序。
- 禁止无效颜色。
- 检查重复选择器。
- 管理 CSS 规范。

## TypeScript 工具

TypeScript 常用命令：

```bash
tsc --noEmit
```

用于只检查类型，不生成文件。

重点配置：

- `strict`
- `target`
- `module`
- `moduleResolution`
- `paths`
- `types`

类型问题不要一味用 `any` 逃避。可以先用清晰的接口描述数据边界。

## 接口调试工具

### Postman

适合调试接口、保存集合、管理环境变量。

### Apifox

适合接口文档、调试、Mock 和团队协作。

### curl

命令行接口调试：

```bash
curl -X POST https://api.example.com/login \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"ada\"}"
```

### 浏览器 Network

真实页面请求一定要看 Network，因为它展示的是浏览器实际发出的请求。

## Git 工具

常用命令：

```bash
git status
git diff
git add .
git commit -m "message"
git log --oneline
```

协作习惯：

- 一个提交只做一类事情。
- 提交信息说明目的。
- 合并前跑构建或测试。
- 不随意提交调试代码。
- 不把密钥提交到仓库。

## 在线演示工具

### CodePen

适合 HTML/CSS/JS 小片段、动画、布局演示。

### StackBlitz

适合 Vite、Vue、React 等完整项目最小复现。

### CodeSandbox

适合组件示例、框架 demo 和问题复现。

最小复现原则：

- 只保留能复现问题的代码。
- 删除无关业务逻辑。
- 写清楚预期结果和实际结果。

## 性能分析工具

### Lighthouse

检查：

- Performance
- Accessibility
- Best Practices
- SEO

### PageSpeed Insights

适合分析线上页面真实体验和实验室数据。

### WebPageTest

适合更细粒度分析加载瀑布、地区网络和首屏表现。

### Bundle Analyzer

用于分析构建产物体积，查找过大的依赖。

优化顺序：

1. 先定位瓶颈。
2. 再选择优化方案。
3. 最后验证指标变化。

## 图片与资源工具

- SVGOMG：压缩 SVG。
- Squoosh：压缩图片。
- TinyPNG：压缩 PNG/JPEG。
- Iconify：查图标。
- Figma：查看设计稿、标注、切图。

资源优化关注：

- 图片尺寸是否过大。
- 格式是否合适。
- 是否需要懒加载。
- 图标是否可以用 SVG。

## 正则与数据工具

- regex101：调试正则。
- JSON Formatter：格式化 JSON。
- JWT Debugger：查看 JWT 内容。
- Base64 Decode：调试编码内容。
- URL Encoder/Decoder：处理 URL 编码。

注意不要把敏感 token、真实用户数据粘到不可信在线工具里。

## 文档查询入口

优先级：

1. 官方文档。
2. GitHub README / issue / release notes。
3. MDN。
4. 标准规范。
5. 高质量社区文章。

遇到版本问题时，先看当前项目实际安装版本，再查对应版本文档。

## 工具选择原则

- 能用浏览器原生能力解决的，不急着引库。
- 能用项目已有工具解决的，不重复引入同类工具。
- 新工具要考虑团队学习成本。
- 工具配置要写进 README 或脚本，避免只存在某个人电脑上。
- 自动化优先，例如格式化、检查、构建。

## 常见问题

### 为什么本地可以，线上不行

检查：

- 构建命令是否正确。
- 环境变量是否缺失。
- 资源 base 是否正确。
- 接口地址是否切到线上。
- 静态资源是否上传完整。

### 为什么依赖安装失败

检查：

- Node 版本。
- 包管理器是否一致。
- lock 文件是否冲突。
- 网络或镜像源。
- 依赖版本是否存在。

### 为什么代码格式总变化

可能是多人编辑器格式化规则不一致。建议统一 Prettier 配置，并在保存或提交时自动格式化。

## 面试速查

- npm/yarn/pnpm 区别：依赖安装、lock、存储方式和依赖结构不同。
- Vite 为什么快：开发阶段利用原生 ESM，按需编译。
- ESLint 和 Prettier 区别：前者查问题，后者管格式。
- source map 作用：把构建后的代码映射回源码，方便调试。
- tree shaking：移除未使用代码，依赖 ES Module 静态结构。
- code splitting：拆分代码，减少首屏加载压力。

工具链最终服务于效率和稳定性。把常用工具按场景分类，遇到问题时就能快速找到正确入口。
