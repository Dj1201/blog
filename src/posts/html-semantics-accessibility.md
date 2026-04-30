---
title: "HTML 模块手册：语义、表单、媒体、SEO 与可访问性"
date: "2026-04-28"
category: "前端基础"
tags:
  - HTML
  - 可访问性
  - SEO
  - 前端
excerpt: "把 HTML 相关知识整理成查询手册：文档结构、语义标签、表单、媒体、SEO、可访问性和常见面试点。"
---

HTML 是 Web 页面的结构层。它不只负责“把文字放到页面上”，还会影响 SEO、可访问性、表单交互、浏览器默认行为、自动填充、链接预览和后续 CSS/JS 的可维护性。

## 文档基础结构

一个标准 HTML 文档通常包含：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>页面标题</title>
  </head>
  <body>
    <main>页面主体</main>
  </body>
</html>
```

关键点：

- `<!doctype html>`：让浏览器使用标准模式渲染，避免怪异模式。
- `lang="zh-CN"`：帮助搜索引擎、翻译工具和屏幕阅读器识别语言。
- `charset="UTF-8"`：避免中文乱码。
- `viewport`：移动端响应式页面必备。
- `title`：浏览器标签、搜索结果和收藏夹标题都会用到。

## 常用 head 信息

`head` 里放页面元信息，不直接显示在页面主体里。

```html
<meta name="description" content="页面描述，会影响搜索结果摘要" />
<meta name="robots" content="index,follow" />
<link rel="canonical" href="https://example.com/post" />
<link rel="icon" href="/favicon.ico" />
```

常见用途：

- `description`：给搜索引擎和分享摘要使用。
- `canonical`：告诉搜索引擎当前页面的规范地址，减少重复内容问题。
- `favicon`：站点图标。
- Open Graph：用于社交平台分享卡片。

```html
<meta property="og:title" content="文章标题" />
<meta property="og:description" content="文章摘要" />
<meta property="og:image" content="https://example.com/cover.png" />
```

## 语义化标签

语义化标签让结构更清楚，也让辅助技术更容易理解页面。

- `header`：页面或区块头部。
- `nav`：主要导航。
- `main`：页面主体，一个页面通常只有一个。
- `section`：主题分组。
- `article`：独立内容，例如文章、评论、卡片。
- `aside`：补充内容，例如目录、推荐阅读、侧栏。
- `footer`：页脚或区块底部。
- `figure` / `figcaption`：图片、图表及说明。
- `time`：时间内容，可配合 `datetime`。

示例：

```html
<article>
  <header>
    <h1>前端网络专题</h1>
    <time datetime="2026-04-29">2026-04-29</time>
  </header>
  <p>正文内容...</p>
</article>
```

## 标题层级

标题层级表达内容结构，不是字号工具。

- 页面主标题用 `h1`。
- 章节标题用 `h2`。
- 章节下的小节用 `h3`。
- 不要为了样式跳级，例如从 `h1` 直接到 `h4`。

如果需要改变视觉大小，用 CSS：

```css
.card-title {
  font-size: 1.125rem;
}
```

## 块级元素与行内元素

常见块级元素：

- `div`
- `p`
- `section`
- `article`
- `ul`
- `li`
- `form`
- `h1` 到 `h6`

常见行内元素：

- `span`
- `a`
- `strong`
- `em`
- `code`
- `img`

现代 CSS 可以通过 `display` 改变布局表现，但 HTML 语义仍然应该按内容含义选择。

## 链接 a 标签

```html
<a href="https://example.com">访问网站</a>
```

常见属性：

- `href`：链接地址。
- `target="_blank"`：新标签打开。
- `rel="noopener noreferrer"`：新标签打开外链时建议加上，减少安全风险。
- `download`：提示下载资源。

外链示例：

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  外部链接
</a>
```

## 图片与媒体

图片要写 `alt`。它不是关键词堆叠，而是说明图片在当前上下文的意义。

```html
<img src="/cover.jpg" alt="前端知识体系文章封面" loading="lazy" />
```

常用属性：

- `src`：图片地址。
- `alt`：替代文本。
- `loading="lazy"`：懒加载。
- `width` / `height`：减少布局跳动。

响应式图片：

```html
<picture>
  <source srcset="/cover.avif" type="image/avif" />
  <source srcset="/cover.webp" type="image/webp" />
  <img src="/cover.jpg" alt="封面图" />
</picture>
```

视频：

```html
<video controls preload="metadata" poster="/poster.jpg">
  <source src="/demo.mp4" type="video/mp4" />
</video>
```

## 列表

有顺序用 `ol`，无顺序用 `ul`，术语解释用 `dl`。

```html
<dl>
  <dt>DNS</dt>
  <dd>把域名解析成 IP 地址的系统。</dd>
</dl>
```

不要为了缩进或圆点效果滥用列表，内容确实是列表时再用。

## 表格

表格用于二维数据，不要用来做页面布局。

```html
<table>
  <caption>状态码说明</caption>
  <thead>
    <tr>
      <th scope="col">状态码</th>
      <th scope="col">含义</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>404</td>
      <td>资源不存在</td>
    </tr>
  </tbody>
</table>
```

可访问性重点：

- 使用 `caption` 描述表格。
- 表头用 `th`。
- `scope` 帮助辅助技术理解行列关系。

## 表单

表单是 HTML 很重要的一部分。

```html
<form action="/login" method="post">
  <label for="email">邮箱</label>
  <input id="email" name="email" type="email" autocomplete="email" required />

  <label for="password">密码</label>
  <input id="password" name="password" type="password" autocomplete="current-password" />

  <button type="submit">登录</button>
</form>
```

关键点：

- 每个输入控件配 `label`。
- `name` 决定提交字段名。
- `type` 影响键盘、校验和语义。
- `autocomplete` 能改善自动填充体验。
- 按钮在表单里默认是 `submit`，普通按钮要写 `type="button"`。

常见输入类型：

- `text`
- `email`
- `password`
- `number`
- `search`
- `tel`
- `url`
- `date`
- `file`
- `checkbox`
- `radio`

## 表单校验

HTML 原生校验属性：

- `required`
- `min`
- `max`
- `minlength`
- `maxlength`
- `pattern`
- `type="email"`

示例：

```html
<input
  name="username"
  minlength="3"
  maxlength="20"
  pattern="[a-zA-Z0-9_]+"
  required
/>
```

复杂业务校验仍然应该在 JavaScript 和服务端处理。前端校验负责体验，服务端校验负责安全。

## button 与可点击元素

能用 `button` 就不要用 `div` 模拟按钮。

按钮天然支持：

- 键盘聚焦。
- Enter / Space 触发。
- `disabled` 状态。
- 读屏语义。

图标按钮要给可访问名称：

```html
<button type="button" aria-label="关闭弹窗">
  <span aria-hidden="true">×</span>
</button>
```

## ARIA 使用原则

ARIA 可以增强语义，但不能替代原生元素。

优先级：

1. 首先使用正确 HTML 元素。
2. 原生语义不够时，再补 ARIA。
3. 不要给元素添加错误角色。

常见属性：

- `aria-label`：给无文本控件提供名称。
- `aria-labelledby`：引用其他元素作为名称。
- `aria-describedby`：关联说明文字。
- `aria-hidden="true"`：隐藏装饰内容。
- `aria-expanded`：展开状态。
- `aria-controls`：控件控制的区域。

## 可访问性检查清单

- 页面能否只用键盘操作。
- 焦点样式是否可见。
- 图片是否有合适 `alt`。
- 表单控件是否有关联 `label`。
- 错误提示是否清楚。
- 颜色对比度是否足够。
- 交互控件是否使用 button、a、input 等原生元素。
- 弹窗打开后焦点是否进入弹窗。
- 弹窗关闭后焦点是否回到触发按钮。

## SEO 基础

前端页面影响 SEO 的常见因素：

- 正确的 `title` 和 `description`。
- 合理的标题层级。
- 语义化结构。
- 可抓取的文本内容。
- 图片 `alt`。
- 正确的 canonical。
- 页面加载速度。
- 移动端适配。

SPA 项目如果内容完全依赖客户端渲染，搜索引擎抓取效果可能受影响。内容型站点可以考虑 SSR、SSG 或预渲染。

## 常见问题

### div 和语义标签有什么区别

`div` 没有语义，只表示一个通用容器。`header`、`nav`、`main`、`article` 等标签表达内容含义。语义标签让结构更清晰，也有助于可访问性和 SEO。

### alt 和 title 有什么区别

`alt` 是图片替代文本，图片加载失败或读屏时使用。`title` 通常是鼠标悬停提示，不应该用来替代 `alt`。

### 为什么按钮要写 type

`button` 在 `form` 内默认是提交按钮。如果只是普通交互按钮，应写 `type="button"`，避免意外提交表单。

### label 有什么用

`label` 让输入框有可访问名称，点击文字也能聚焦或切换控件。它对表单体验和可访问性都很重要。

## 面试速查

- 语义化 HTML 的意义：结构清晰、SEO、可访问性、维护性。
- HTML5 新增语义标签：`header`、`nav`、`main`、`section`、`article`、`aside`、`footer`。
- script 的 `defer` 和 `async`：`defer` 延迟到 HTML 解析后按顺序执行，`async` 下载完立即执行且不保证顺序。
- iframe 优缺点：隔离页面、嵌入第三方内容；但有性能、安全、通信复杂度问题。
- localStorage、sessionStorage、Cookie：存储生命周期、容量、是否随请求携带不同。

HTML 写得越稳，CSS 和 JavaScript 越容易维护。结构层的问题越早解决，后面的页面复杂度越低。
