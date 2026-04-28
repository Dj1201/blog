# Vue 3 Starter

这是一个基于 `Vue 3 + Vite` 的个人博客项目，支持用 Markdown 写文章。

## Commands

在项目根目录运行：

| Command | Action |
| :-- | :-- |
| `yarn install` | 安装依赖 |
| `yarn dev` | 启动本地开发服务 |
| `yarn build` | 构建生产包到 `dist/` |
| `yarn preview` | 本地预览生产构建 |

## Writing

在 `src/posts` 目录里新增 `.md` 文件即可发布文章。

```md
---
title: "文章标题"
date: "2026-04-28"
tags:
  - Vue
  - 博客
excerpt: "文章摘要会显示在首页和列表页。"
---

这里写正文。
```

## Structure

```text
/
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── background.svg
│   ├── components/
│   │   └── PostCard.vue
│   ├── lib/
│   │   └── posts.js
│   ├── posts/
│   │   ├── hello-vue-blog.md
│   │   └── writing-notes.md
│   ├── router/
│   │   └── index.js
│   ├── styles/
│   │   └── global.css
│   ├── views/
│   │   ├── AboutView.vue
│   │   ├── HomeView.vue
│   │   ├── NotFoundView.vue
│   │   ├── PostsView.vue
│   │   └── PostView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```
