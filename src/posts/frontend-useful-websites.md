---
title: "前端常用网站导航"
date: "2026-04-29"
category: "工具与资源"
tags:
  - 前端
  - 工具
  - 学习资源
excerpt: "收集前端学习、查文档、查兼容性、在线调试、性能分析和社区交流常用的网站。"
---

前端资料很多，最重要的是知道什么时候该查哪里。下面这些网站可以按用途收藏，遇到问题时比随手搜索更稳定。

## 官方文档与标准

### MDN Web Docs

[MDN](https://developer.mozilla.org/zh-CN/) 适合查询 HTML、CSS、JavaScript、Web API、HTTP、可访问性和浏览器兼容性。遇到基础 API 或 CSS 属性不确定时，优先查 MDN。

### web.dev

[web.dev](https://web.dev/) 由 Chrome 团队维护，适合学习性能优化、可访问性、PWA、现代 Web 能力和最佳实践。

### TC39

[TC39](https://tc39.es/) 适合了解 JavaScript 语言标准和新提案。日常开发不一定频繁使用，但想理解某个语法为什么这样设计时很有价值。

### W3C

[W3C](https://www.w3.org/) 是 Web 标准组织之一。它更偏标准与规范，不如 MDN 适合日常速查，但适合查标准背景。

## 框架与工程化

### Vue

[Vue 官方文档](https://cn.vuejs.org/) 是学习 Vue 3 的首选入口。查组合式 API、组件通信、生命周期、路由和状态管理时，优先看官方文档。

### Vite

[Vite 官方文档](https://cn.vite.dev/) 适合查询开发服务器、构建配置、静态资源、环境变量、插件和部署相关问题。

### TypeScript

[TypeScript 文档](https://www.typescriptlang.org/docs/) 适合学习类型系统、配置项、泛型、类型收窄和工程迁移。

### npm Docs

[npm Docs](https://docs.npmjs.com/) 适合查询包管理、`package.json`、依赖安装、发布包、`npm audit` 和常见 npm 错误。

## 兼容性与调试

### Can I use

[Can I use](https://caniuse.com/) 用来查询浏览器是否支持某个 CSS、HTML 或 Web API 特性。准备使用新特性前，可以先查兼容性。

### Chrome DevTools

[Chrome DevTools 文档](https://developer.chrome.com/docs/devtools) 适合学习 Elements、Console、Network、Performance、Application 等面板的用法。

### PageSpeed Insights

[PageSpeed Insights](https://pagespeed.web.dev/) 可以分析网页性能，并给出移动端、桌面端的指标和优化建议。

### Lighthouse

[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) 可以检查性能、可访问性、最佳实践和 SEO。Chrome DevTools 里也可以直接运行。

## 在线练习与代码演示

### CodePen

[CodePen](https://codepen.io/) 适合快速写 HTML、CSS、JavaScript 小 demo，尤其适合调样式、动画和交互片段。

### StackBlitz

[StackBlitz](https://stackblitz.com/) 适合快速创建 Vue、React、Vite 等前端项目，用来做最小复现或分享 demo。

### CodeSandbox

[CodeSandbox](https://codesandbox.io/) 适合在线搭建完整示例，常用于框架问题复现和组件演示。

### regex101

[regex101](https://regex101.com/) 适合编写、测试和解释正则表达式。处理表单校验、字符串提取时很方便。

## 社区与问题搜索

### Stack Overflow

[Stack Overflow](https://stackoverflow.com/questions) 适合搜索具体报错、浏览器行为差异和框架使用问题。提问前最好准备最小复现和清晰错误信息。

### GitHub

[GitHub](https://github.com/) 适合查开源项目源码、issue、release notes 和示例项目。遇到依赖异常时，项目 issue 往往比普通搜索更精准。

### 掘金

[掘金](https://juejin.cn/) 有大量中文前端文章，适合看实践经验和技术总结。阅读时要注意文章发布时间和适用版本。

### SegmentFault 思否

[SegmentFault 思否](https://segmentfault.com/) 适合搜索中文问答和技术文章，尤其是一些本土环境里的配置问题。

### 阮一峰的网络日志

[阮一峰的网络日志](https://www.ruanyifeng.com/blog/) 适合阅读 JavaScript、Web、工程化和科技观察类文章，很多内容适合作为入门补充材料。

## 延伸阅读文章

如果已经熟悉基础语法，可以按专题补这些文章。它们更适合用来建立前端知识体系，而不是只解决某个临时问题。

### 浏览器渲染与性能

- [Rendering performance](https://web.dev/articles/rendering-performance)：理解样式计算、布局、绘制和合成，适合解释页面为什么会卡。
- [Optimize Interaction to Next Paint](https://web.dev/articles/optimize-inp)：学习如何优化交互响应，定位长任务和主线程阻塞。
- [Rendering on the Web](https://web.dev/articles/rendering-on-the-web)：理解 CSR、SSR、SSG、hydration 等渲染方式的取舍。

### 事件循环与异步

- [MDN Microtask guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)：理解微任务、任务队列和 Promise 回调执行时机。
- [Event loop: microtasks and macrotasks](https://javascript.info/event-loop)：用更直观的例子理解事件循环、渲染时机和异步拆分。

### 现代 CSS 与可访问性

- [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)：学习组件级响应式布局，避免所有布局都依赖视口宽度。
- [Learn CSS](https://web.dev/learn/css)：系统补齐 CSS 选择器、盒模型、布局、动画和层叠规则。
- [Learn Accessibility](https://web.dev/learn/accessibility)：理解语义结构、键盘访问、焦点管理和辅助技术友好设计。

### TypeScript 与工程化

- [TypeScript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)：理解类型收窄，写出更稳定的分支逻辑。
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)：学习泛型和约束，适合封装通用函数、组件和工具类型。
- [Vite Performance](https://vite.dev/guide/performance/)：了解 Vite 项目变慢时可以从哪些方向排查。

### 测试、网络与安全

- [Vitest Guide](https://vitest.dev/guide/)：学习前端单元测试和组件逻辑测试。
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)：学习端到端测试如何更接近真实用户行为。
- [MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)：理解缓存命中、强缓存、协商缓存和线上资源不更新的问题。
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)：系统理解 XSS 防护，尤其是输入输出边界。

### 框架与项目架构

- [Thinking in React](https://react.dev/learn/thinking-in-react)：学习如何从 UI 拆组件、找状态、组织数据流。
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)：理解副作用边界，避免把派生数据和普通计算都塞进 effect。
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)：理解岛屿架构，适合内容站、文档站和少量交互页面。
- [Patterns.dev](https://www.patterns.dev/)：按模式理解前端架构、渲染策略和性能优化方案。

## 使用建议

- 查 API：优先 MDN 和官方文档。
- 查兼容性：优先 Can I use。
- 查框架行为：优先框架官方文档和 GitHub issue。
- 查报错：先复制关键错误信息，再看 Stack Overflow 和 GitHub。
- 查性能：先用 DevTools、Lighthouse、PageSpeed Insights 看数据。
- 看中文文章：注意发布时间、框架版本和是否有源码验证。

网站只是入口，真正重要的是建立判断资料质量的习惯。越接近官方文档、标准、源码和可复现 demo，信息通常越可靠。
