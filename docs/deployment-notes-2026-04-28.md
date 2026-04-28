# 2026-04-28 博客项目改造与部署记录

## 项目目标

把原来的 Astro 项目改造成一个可部署到 GitHub Pages 的个人博客项目，并支持使用 Markdown 写文章。

最终线上地址：

```text
https://dj1201.github.io/blog/
```

## 主要操作

### 1. 关联远程仓库

远程仓库地址：

```text
https://github.com/Dj1201/blog.git
```

一开始执行 `git remote add origin` 时遇到本地权限问题：

```text
error: could not lock config file .git/config: Permission denied
fatal: could not set 'remote.origin.url'
```

原因是当前环境没有权限写入 `.git/config`。后续通过提升权限完成了远程仓库关联。

### 2. 从 Astro 改造成 Vue 3 项目

原项目是 Astro starter，后来改造成纯 `Vue 3 + Vite` 项目。

主要变化：

- 删除 Astro 配置和页面结构
- 新增 `index.html`
- 新增 `src/main.js`
- 新增 `src/App.vue`
- 新增 `vite.config.js`
- 把 `package.json` 脚本改成 Vite 命令
- 使用 `yarn.lock` 作为依赖锁文件
- 删除旧的 `pnpm-lock.yaml`

当前常用命令：

```bash
yarn dev
yarn build
yarn preview
```

### 3. 搭建个人博客基础框架

新增了博客常用页面：

- 首页
- 文章列表页
- 文章详情页
- 关于页
- 404 页面

新增目录：

```text
src/components/
src/lib/
src/posts/
src/router/
src/styles/
src/views/
```

文章放在：

```text
src/posts/
```

文章格式示例：

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

Markdown 文章通过 Vite 插件在构建阶段读取和渲染，避免把 Markdown 解析依赖打进浏览器包里。

### 4. GitHub Pages 部署配置

为了部署到仓库页面：

```text
https://dj1201.github.io/blog/
```

在 `vite.config.js` 中设置：

```js
base: '/blog/'
```

由于 GitHub Pages 对单页应用的 history 路由刷新不友好，路由改成 hash 模式：

```js
createWebHashHistory(import.meta.env.BASE_URL)
```

新增 GitHub Actions 工作流：

```text
.github/workflows/deploy.yml
```

工作流流程：

1. checkout 代码
2. setup Node 22
3. 安装依赖
4. 执行 `yarn build`
5. 上传 `dist`
6. 部署到 GitHub Pages

## 遇到的问题

### 问题 1：仓库是私有仓库，不能启用 Pages

GitHub Pages 页面提示：

```text
Upgrade or make this repository public to enable Pages
```

原因：

免费 GitHub 账号通常不能给私有仓库启用 GitHub Pages。

解决：

把仓库改成 Public 后，GitHub Pages 设置页面可以继续配置。

### 问题 2：Actions 部署失败

失败信息：

```text
Branch "main_dj" is not allowed to deploy to github-pages due to environment protection rules.
The deployment was rejected or didn't satisfy other protection rules.
```

原因：

GitHub Pages 的 `github-pages` environment 默认没有允许 `main_dj` 分支部署。

解决：

把 `main_dj` 推送到远程 `main`，后续使用 `main` 分支部署。

执行过的核心操作：

```bash
git push origin main_dj:main
git checkout main
git branch --set-upstream-to=origin/main main
git pull --ff-only
```

最终 `main` 分支触发的 GitHub Actions 部署成功。

### 问题 3：本机 Git HTTPS 组件弹窗报错

部署过程中出现 Windows 弹窗：

```text
git-remote-https.exe - 应用程序错误
```

原因：

当前远程仓库使用 HTTPS 地址：

```text
https://github.com/Dj1201/blog.git
```

执行 `git push`、`git fetch`、`git pull` 等操作时，Git 会调用 `git-remote-https.exe`。弹窗说明本机 Git 的 HTTPS 组件崩溃。

这不是 GitHub Pages 部署本身的问题，部署已经成功。

后续建议：

1. 优先改用 SSH remote，避免继续调用 `git-remote-https.exe`
2. 或者升级 / 重装 Git for Windows

推荐 SSH 方式：

```bash
ssh-keygen -t ed25519 -C "你的 GitHub 邮箱"
git remote set-url origin git@github.com:Dj1201/blog.git
```

然后把生成的公钥添加到：

```text
GitHub -> Settings -> SSH and GPG keys -> New SSH key
```

### 问题 4：本地命令权限不足

多次遇到 `.git` 或 `node_modules` 文件权限不足，例如：

```text
Permission denied
EPERM: operation not permitted
```

常见场景：

- 写入 `.git/config`
- 创建 `.git/index.lock`
- 安装依赖时修改 `node_modules`
- 切换分支或提交

解决：

使用提升权限执行相关命令。

## 当前状态

当前使用分支：

```text
main
```

远程仓库：

```text
origin https://github.com/Dj1201/blog.git
```

GitHub Pages 部署状态：

```text
main 分支部署成功
```

线上地址：

```text
https://dj1201.github.io/blog/
```

## 以后发布文章的流程

1. 在 `src/posts/` 新增或修改 `.md` 文件
2. 本地预览：

```bash
yarn dev
```

3. 构建检查：

```bash
yarn build
```

4. 提交并推送：

```bash
git add .
git commit -m "Add new post"
git push
```

推送到 `main` 后，GitHub Actions 会自动重新部署 GitHub Pages。

## 后续建议

- 把远程地址改成 SSH，减少 HTTPS 弹窗问题
- 修改博客里的占位文案为真实个人介绍
- 添加头像、社交链接和个人信息
- 添加深色模式
- 添加代码高亮
- 添加文章搜索或标签页
