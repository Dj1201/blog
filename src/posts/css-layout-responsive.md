---
title: "CSS 小白到查询手册：语法、属性、布局、动画与效果示例"
date: "2026-04-27"
category: "前端基础"
tags:
  - CSS
  - 布局
  - 响应式
  - 前端
excerpt: "面向初学者的 CSS 图文手册：讲清 CSS 语法、选择器、盒模型、常用属性、Flex、Grid、定位、响应式和动画。"
---

CSS 用来控制网页长什么样。HTML 负责“页面里有什么”，CSS 负责“这些内容怎么摆、什么颜色、多大、有没有动画”。如果把网页比作一间屋子，HTML 是家具和墙体，CSS 就是装修、摆放和灯光。

这篇文章按“能查”的方式整理：先看语法，再看常用属性，然后看布局和实战效果。

## CSS 写在哪里

CSS 有三种常见写法。

### 1. 外部样式文件

项目里最常用，适合维护。

```html
<link rel="stylesheet" href="/style.css" />
```

### 2. style 标签

适合写少量页面样式。

```html
<style>
  p {
    color: blue;
  }
</style>
```

### 3. 内联样式

写在元素上，优先级高，但不适合大量使用。

```html
<p style="color: blue;">这是一段蓝色文字</p>
```

建议：正式项目里优先用外部样式或组件样式，少用内联样式。

## CSS 基本语法

一条 CSS 规则由选择器、属性和值组成。

![CSS 语法结构](/blog/css-examples/css-syntax.svg)

```css
.card {
  color: blue;
  font-size: 18px;
}
```

解释：

- `.card` 是选择器，表示选中 class 为 card 的元素。
- `color` 和 `font-size` 是属性。
- `blue` 和 `18px` 是属性值。
- 每条声明用分号结尾。

CSS 注释：

```css
/* 这是一段注释，不会影响页面 */
.title {
  color: red;
}
```

## 选择器

选择器用来告诉浏览器“我要选中哪些元素”。

### 元素选择器

选中所有 `p` 标签。

```css
p {
  color: #333;
}
```

### 类选择器

最常用。HTML：

```html
<div class="card">卡片</div>
```

CSS：

```css
.card {
  border: 1px solid #ddd;
}
```

### ID 选择器

```css
#app {
  min-height: 100vh;
}
```

ID 在一个页面里应该唯一。日常写样式更推荐 class。

### 后代选择器

选中 `.article` 里面的所有 `p`。

```css
.article p {
  line-height: 1.8;
}
```

### 子代选择器

只选中 `.nav` 的直接子元素 `a`。

```css
.nav > a {
  padding: 8px 12px;
}
```

### 伪类选择器

表示某种状态。

```css
a:hover {
  color: red;
}

input:focus {
  border-color: blue;
}
```

### 伪元素选择器

创建或选中元素的一部分。

```css
/* 给标题前面加一条装饰线 */
.title::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 16px;
  background: blue;
}
```

## 优先级：为什么我的样式没生效

当多条 CSS 同时作用于一个元素时，浏览器会比较优先级。

大致顺序：

1. `!important`
2. 内联样式
3. ID 选择器
4. class、属性、伪类选择器
5. 标签、伪元素选择器
6. 继承样式

同优先级时，后写的覆盖先写的。

```css
p {
  color: red;
}

.text {
  color: blue;
}
```

```html
<p class="text">最终是蓝色</p>
```

不要滥用 `!important`。如果经常要用它，通常说明样式结构需要调整。

## 常用单位

### px

固定像素，最直观。

```css
.box {
  width: 200px;
}
```

### %

相对父元素。

```css
.box {
  width: 50%;
}
```

### rem

相对根元素 `html` 的字体大小。常用于整体尺寸。

```css
.title {
  font-size: 2rem;
}
```

### em

相对当前元素或父元素字体大小。容易受上下文影响。

### vw / vh

相对视口宽高。

```css
.hero {
  min-height: 100vh;
}
```

### fr

Grid 布局里的剩余空间单位。

```css
.grid {
  grid-template-columns: 1fr 2fr;
}
```

## 颜色写法

```css
.demo {
  color: red;
  color: #ff0000;
  color: rgb(255, 0, 0);
  color: rgba(255, 0, 0, 0.5);
  color: hsl(0 100% 50%);
}
```

常用建议：

- 项目主题色用 CSS 变量管理。
- 正文颜色不要太浅。
- 文字和背景要有足够对比度。

## 字体与文本属性

常用属性：

```css
.text {
  color: #222;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.8;
  text-align: center;
  text-decoration: underline;
  letter-spacing: 0;
}
```

解释：

- `color`：文字颜色。
- `font-family`：字体。
- `font-size`：字号。
- `font-weight`：字重，`400` 普通，`700` 加粗。
- `line-height`：行高，正文常用 `1.6` 到 `1.9`。
- `text-align`：文本对齐。
- `text-decoration`：下划线等装饰。

单行省略：

```css
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

多行省略：

```css
.summary {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## 背景属性

```css
.banner {
  background-color: #eef4ff;
  background-image: url("/cover.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

解释：

- `background-color`：背景色。
- `background-image`：背景图。
- `background-size: cover`：铺满容器，可能裁剪。
- `background-size: contain`：完整显示，可能留空。
- `background-position`：背景图位置。
- `background-repeat`：是否重复平铺。

## 盒模型

每个元素都可以看成一个盒子。

![CSS 盒模型](/blog/css-examples/box-model.svg)

盒子从内到外：

1. `content`：内容区域。
2. `padding`：内边距，内容和边框之间的距离。
3. `border`：边框。
4. `margin`：外边距，元素和其他元素之间的距离。

示例：

```css
.card {
  width: 240px;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 16px;
}
```

建议全局设置：

```css
* {
  box-sizing: border-box;
}
```

这样 `width` 会包含 `padding` 和 `border`，更容易计算。

## 宽高属性

```css
.box {
  width: 300px;
  height: 160px;
  min-width: 200px;
  max-width: 600px;
  min-height: 120px;
  max-height: 400px;
}
```

常用建议：

- 页面容器常用 `max-width` 限制最大宽度。
- 尽量少给正文区域写固定高度。
- 图片设置 `max-width: 100%`，避免撑破容器。

```css
img {
  max-width: 100%;
  height: auto;
}
```

## display 属性

`display` 决定元素怎么参与布局。

常见值：

- `block`：块级元素，独占一行。
- `inline`：行内元素，不能直接设置宽高。
- `inline-block`：行内排列，但可以设置宽高。
- `flex`：弹性布局。
- `grid`：网格布局。
- `none`：隐藏元素，不占位。

```css
.hidden {
  display: none;
}
```

`display: none` 和 `visibility: hidden` 区别：

- `display: none`：不显示，也不占位置。
- `visibility: hidden`：不显示，但仍占位置。

## Flex 布局

Flex 用来做一维布局：一行或一列。

![Flex 布局效果](/blog/css-examples/flex-layout.svg)

HTML：

```html
<div class="toolbar">
  <button>左侧</button>
  <button>中间</button>
  <button>右侧</button>
</div>
```

CSS：

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
```

常用属性：

- `flex-direction`：排列方向，`row` 横向，`column` 纵向。
- `justify-content`：主轴对齐。
- `align-items`：交叉轴对齐。
- `gap`：间距。
- `flex-wrap`：是否换行。

子元素常用：

```css
.item {
  flex: 1;
}
```

表示占满剩余空间。

常见场景：

- 导航栏。
- 按钮组。
- 图标加文字。
- 卡片内部信息排列。
- 水平垂直居中。

居中写法：

```css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Grid 布局

Grid 用来做二维布局：行和列。

![Grid 布局效果](/blog/css-examples/grid-layout.svg)

HTML：

```html
<div class="grid">
  <article>1</article>
  <article>2</article>
  <article>3</article>
</div>
```

CSS：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

响应式卡片写法：

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

意思：每个卡片最小 240px，空间够就自动多列，不够就换行。

常见场景：

- 文章列表。
- 商品列表。
- 后台仪表盘。
- 图片墙。
- 两栏或三栏页面布局。

## position 定位

定位用来控制元素位置。

![定位效果](/blog/css-examples/positioning.svg)

常见值：

- `static`：默认值。
- `relative`：相对自己原位置偏移。
- `absolute`：相对最近的定位祖先定位。
- `fixed`：相对浏览器窗口固定。
- `sticky`：滚动到某个位置后吸附。

角标例子：

```html
<div class="card">
  <span class="badge">NEW</span>
  <p>卡片内容</p>
</div>
```

```css
.card {
  position: relative;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
}
```

关键点：父元素写 `position: relative`，子元素写 `position: absolute`。

## z-index 层级

`z-index` 控制层叠顺序。

```css
.modal {
  position: fixed;
  z-index: 1000;
}
```

注意：`z-index` 不是越大越一定有效。父元素如果创建了层叠上下文，子元素会被限制在这个上下文里。

常见创建层叠上下文的属性：

- `position` + `z-index`
- `transform`
- `opacity < 1`
- `filter`
- `isolation: isolate`

## overflow 溢出

```css
.panel {
  overflow: hidden;
  overflow: auto;
  overflow-x: auto;
  overflow-y: scroll;
}
```

解释：

- `visible`：默认，溢出可见。
- `hidden`：裁掉溢出内容。
- `auto`：需要时出现滚动条。
- `scroll`：总是显示滚动条。

横向滚动代码块常用：

```css
pre {
  overflow-x: auto;
}
```

## border、圆角和阴影

```css
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
```

解释：

- `border`：边框。
- `border-radius`：圆角。
- `box-shadow`：阴影。

阴影不要太重，否则页面会显得脏。后台、博客、工具类界面通常用轻阴影。

## CSS 变量

CSS 变量适合管理主题色、间距、圆角。

```css
:root {
  --accent: #2563eb;
  --radius: 8px;
}

.button {
  border-radius: var(--radius);
  background: var(--accent);
}
```

好处：

- 统一维护。
- 方便换主题。
- 减少重复颜色和尺寸。

## 主流 CSS 框架怎么理解

CSS 框架就是别人提前写好的一套样式规则、组件规则或工具类。你可以直接按它的语法写页面，减少从零写 CSS 的时间。

常见类型：

- 组件型框架：Bootstrap、Bulma，提供按钮、表单、栅格、卡片等现成样式。
- 原子类框架：Tailwind CSS、UnoCSS，用很多小 class 组合样式。
- UI 组件库：Element Plus、Ant Design Vue，提供 Vue 组件，不只是 CSS。
- 预处理器/语法增强：Sass、Less，让 CSS 能写变量、嵌套、函数等。

怎么选：

- 想快速做后台或管理系统：Element Plus、Ant Design Vue。
- 想快速做普通响应式页面：Bootstrap、Bulma。
- 想自由控制设计、不想写很多自定义 CSS：Tailwind CSS。
- 想更轻、更按需、更偏工程化：UnoCSS。

## Bootstrap

Bootstrap 是经典 CSS 组件框架，适合快速做响应式页面。

常见语法特点：

- `.container`：居中容器。
- `.row`：一行。
- `.col-*`：列。
- `.btn`：按钮。
- `.card`：卡片。
- `.d-flex`：Flex 工具类。
- `.text-center`：文本居中。

按钮示例：

```html
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-outline-secondary">次要按钮</button>
```

栅格示例：

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">卡片 1</div>
    <div class="col-12 col-md-6 col-lg-4">卡片 2</div>
    <div class="col-12 col-md-6 col-lg-4">卡片 3</div>
  </div>
</div>
```

解释：

- `col-12`：手机上一行占满。
- `col-md-6`：中等屏幕一行两个。
- `col-lg-4`：大屏幕一行三个。

适合小白理解响应式栅格。

## Tailwind CSS

Tailwind CSS 是原子类框架。它不直接提供“卡片组件”，而是提供很多小工具类，你用这些类组合出样式。

普通 CSS：

```css
.card {
  border-radius: 8px;
  padding: 16px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
```

Tailwind 写法：

```html
<div class="rounded-lg bg-white p-4 shadow-md">
  卡片内容
</div>
```

常见类：

- `flex`：display flex。
- `grid`：display grid。
- `items-center`：align-items center。
- `justify-between`：justify-content space-between。
- `p-4`：padding。
- `m-4`：margin。
- `text-sm`：小字号。
- `font-bold`：加粗。
- `bg-blue-500`：蓝色背景。
- `rounded-lg`：较大圆角。

响应式写法：

```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <article>1</article>
  <article>2</article>
  <article>3</article>
</div>
```

解释：

- 默认手机端 1 列。
- `md:grid-cols-2`：中屏 2 列。
- `lg:grid-cols-3`：大屏 3 列。

Tailwind 的优点是写得快、样式不容易互相污染。缺点是 class 会比较长，小白刚开始需要熟悉类名规则。

## UnoCSS

UnoCSS 和 Tailwind 类似，也是原子化 CSS，但更偏“按需生成”。你用到什么 class，它就生成什么 CSS。

示例：

```html
<button class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
  保存
</button>
```

它常出现在 Vite、Vue 项目里，适合追求更轻量、更灵活的团队。

小白可以先理解为：UnoCSS 和 Tailwind 都是“用 class 直接写样式”的方案。

## Bulma

Bulma 是基于 Flexbox 的 CSS 框架，语法比较语义化。

按钮：

```html
<button class="button is-primary">主要按钮</button>
<button class="button is-light">浅色按钮</button>
```

布局：

```html
<div class="columns">
  <div class="column">第一列</div>
  <div class="column">第二列</div>
  <div class="column">第三列</div>
</div>
```

Bulma 不依赖 JavaScript，适合只想要 CSS 样式和布局的人。

## Element Plus

Element Plus 是 Vue 3 常用 UI 组件库，适合后台管理系统。

按钮：

```vue
<el-button type="primary">主要按钮</el-button>
<el-button>默认按钮</el-button>
```

表单：

```vue
<el-form :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary">提交</el-button>
  </el-form-item>
</el-form>
```

适合：

- 后台系统。
- 表单很多的项目。
- 表格、弹窗、分页、日期选择器等组件需求多的项目。

## Ant Design Vue

Ant Design Vue 是 Ant Design 的 Vue 版本，设计风格偏企业级应用。

按钮：

```vue
<a-button type="primary">主要按钮</a-button>
<a-button>默认按钮</a-button>
```

栅格：

```vue
<a-row :gutter="16">
  <a-col :span="8">第一列</a-col>
  <a-col :span="8">第二列</a-col>
  <a-col :span="8">第三列</a-col>
</a-row>
```

适合：

- 企业后台。
- 中大型管理系统。
- 需要统一设计规范的项目。

## Sass / SCSS

Sass 是 CSS 预处理器，SCSS 是常用语法。

变量：

```scss
$primary: #2563eb;

.button {
  background: $primary;
}
```

嵌套：

```scss
.card {
  padding: 16px;

  .title {
    font-weight: 700;
  }
}
```

混入：

```scss
@mixin center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  @include center;
}
```

注意：嵌套不要太深，否则生成的选择器会很难维护。

## 响应式设计

响应式就是让页面在手机、平板、电脑上都能正常显示。

![响应式布局效果](/blog/css-examples/responsive.svg)

媒体查询：

```css
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

常用容器：

```css
.container {
  width: min(100% - 32px, 1120px);
  margin-inline: auto;
}
```

解释：

- 小屏幕宽度是 `100% - 32px`，左右保留 16px。
- 大屏幕最大宽度 1120px。
- `margin-inline: auto` 让容器居中。

## 移动端适配

移动端适配目标：手机屏幕窄、触摸操作、网络可能慢，所以布局要清楚、按钮要好点、文字要能读。

HTML 必备：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

没有这行，手机浏览器可能按桌面宽度缩放页面。

移动端常用规则：

```css
.page {
  width: min(100% - 32px, 1120px);
  margin-inline: auto;
}

.card-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
```

按钮触摸面积建议不小于 40px：

```css
.button {
  min-height: 44px;
  padding: 10px 14px;
}
```

移动端要避免：

- 字太小。
- 按钮太密。
- 固定宽度导致横向滚动。
- 弹窗高度超过屏幕无法滚动。
- hover 才能看到的重要内容。

移动端安全区域：

```css
.footer {
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

这对有底部手势条的手机更友好。

## PC 端适配

PC 端屏幕更宽，重点是控制阅读宽度和信息密度。

常见容器：

```css
.container {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 24px;
}
```

PC 常见布局：

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 24px;
}
```

三栏布局：

```css
.docs-layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 260px;
  gap: 24px;
}
```

适合文档站：左边导航，中间正文，右边目录。

PC 端要避免：

- 正文铺满全屏，阅读太累。
- 卡片过宽导致信息稀疏。
- 没有 hover/focus 状态。
- 表格太宽但没有横向滚动。

## 同一页面同时适配移动端和 PC

推荐移动优先：先写手机样式，再用媒体查询增强大屏。

```css
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

这样写的好处：

- 手机端天然可用。
- 屏幕越大，布局逐步增强。
- 不容易忘记移动端。

常用断点可以这样记：

| 断点 | 常见含义 |
| --- | --- |
| `480px` | 小手机到大手机 |
| `768px` | 平板或小屏电脑 |
| `1024px` | 普通桌面屏 |
| `1280px` | 大屏桌面 |

断点不是死规则，要根据内容决定。内容一挤就该换布局。

## 动画和过渡

过渡适合 hover、展开、颜色变化。

```css
.button {
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  background-color: #1648b3;
}
```

关键帧动画：

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fade-in 0.3s ease;
}
```

性能建议：

- 优先动画 `transform` 和 `opacity`。
- 少动画 `width`、`height`、`top`、`left`。
- 不要让动画影响阅读和操作。

## 常用属性速查表

| 分类 | 常用属性 | 作用 |
| --- | --- | --- |
| 文本 | `color` | 文字颜色 |
| 文本 | `font-size` | 字号 |
| 文本 | `font-weight` | 字重 |
| 文本 | `line-height` | 行高 |
| 文本 | `text-align` | 文本对齐 |
| 盒模型 | `width` / `height` | 宽高 |
| 盒模型 | `padding` | 内边距 |
| 盒模型 | `margin` | 外边距 |
| 盒模型 | `border` | 边框 |
| 布局 | `display` | 布局方式 |
| 布局 | `position` | 定位方式 |
| 布局 | `z-index` | 层级 |
| 布局 | `overflow` | 溢出处理 |
| Flex | `justify-content` | 主轴对齐 |
| Flex | `align-items` | 交叉轴对齐 |
| Grid | `grid-template-columns` | 列设置 |
| 背景 | `background` | 背景 |
| 效果 | `border-radius` | 圆角 |
| 效果 | `box-shadow` | 阴影 |
| 动画 | `transition` | 过渡 |
| 动画 | `animation` | 关键帧动画 |

## CSS 框架速查表

| 框架 | 类型 | 适合场景 | 语法特点 |
| --- | --- | --- | --- |
| Bootstrap | 组件 + 栅格 | 快速响应式页面 | `.container`、`.row`、`.col-md-6` |
| Tailwind CSS | 原子类 | 自定义设计、快速写样式 | `flex`、`p-4`、`text-sm`、`md:grid-cols-2` |
| UnoCSS | 原子类引擎 | Vite/Vue 灵活工程 | 按需生成工具类 |
| Bulma | CSS 框架 | 简洁页面布局 | `.columns`、`.button is-primary` |
| Element Plus | Vue UI 库 | 后台管理系统 | `<el-button>`、`<el-table>` |
| Ant Design Vue | Vue UI 库 | 企业级后台 | `<a-button>`、`<a-table>` |
| Sass/SCSS | CSS 预处理器 | 大型样式组织 | 变量、嵌套、mixin |

## 常见问题：样式为什么没生效

按这个顺序查：

1. CSS 文件是否引入。
2. class 名是否写对。
3. 选择器是否匹配元素。
4. 是否被更高优先级覆盖。
5. 是否被后面的样式覆盖。
6. 是否有媒体查询限制。
7. 是否被 scoped 样式影响。
8. 浏览器 DevTools 里能不能看到这条规则。

## 常见问题：为什么垂直居中失败

通常是父元素没有高度。

```css
.parent {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

`align-items` 需要有可用于对齐的空间。

## 常见问题：文字溢出怎么办

长单词或 URL：

```css
.content {
  overflow-wrap: anywhere;
}
```

单行标题：

```css
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## 常见问题：Flex 和 Grid 怎么选

简单记：

- 一行或一列，用 Flex。
- 同时管行和列，用 Grid。

例子：

- 导航栏：Flex。
- 卡片内按钮：Flex。
- 文章列表：Grid。
- 后台仪表盘：Grid。

## 初学者练习路线

1. 改文字颜色、字号、行高。
2. 练盒模型：padding、margin、border。
3. 用 Flex 做导航栏和居中。
4. 用 Grid 做卡片列表。
5. 用 position 做角标和弹窗。
6. 用媒体查询做手机适配。
7. 用 transition 做 hover 效果。

CSS 学习最重要的是“看效果”。写一小段代码，马上观察页面变化，比只背属性快得多。
