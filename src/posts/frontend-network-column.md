---
title: "前端网络模块手册：HTTP、HTTPS、缓存、跨域、Cookie 与接口排查"
date: "2026-04-30"
category: "浏览器与网络"
tags:
  - 网络
  - HTTP
  - 缓存
  - 跨域
  - 前端
excerpt: "系统整理前端必须掌握的网络知识：URL、DNS、TCP、TLS、HTTP、缓存、跨域、Cookie、鉴权和接口排查。"
---

网络是前端排查问题最高频的模块之一。页面打不开、接口失败、跨域、缓存不更新、登录态丢失、线上资源 404，最终都要回到浏览器 Network 面板和 HTTP 机制来解释。

## URL 组成

示例：

```text
https://www.example.com:443/posts?id=10#comments
```

组成：

- 协议：`https`
- 域名：`www.example.com`
- 端口：`443`
- 路径：`/posts`
- 查询参数：`?id=10`
- 哈希：`#comments`

前端路由常用 hash，例如 `/#/posts`，浏览器不会把 hash 发给服务器。

## 从输入 URL 到页面展示

主流程：

1. 浏览器解析 URL。
2. 检查缓存。
3. DNS 解析域名到 IP。
4. 建立 TCP 连接。
5. HTTPS 进行 TLS 握手。
6. 发送 HTTP 请求。
7. 服务器处理并返回响应。
8. 浏览器解析 HTML，继续加载 CSS、JS、图片等资源。
9. 渲染页面。

性能排查时，Network 面板会显示 DNS、连接、SSL、等待响应、下载等耗时。

## DNS

DNS 负责把域名解析成 IP 地址。

可能影响：

- 首次访问域名会有 DNS 查询耗时。
- DNS 配置错误会导致站点无法访问。
- CDN 会根据地区返回不同节点。

优化方式：

```html
<link rel="dns-prefetch" href="//cdn.example.com" />
```

更强的预连接：

```html
<link rel="preconnect" href="https://cdn.example.com" />
```

## TCP 与三次握手

HTTP/1.1 和 HTTP/2 通常基于 TCP。TCP 建立连接需要三次握手，用来确认双方收发能力。

前端需要知道的是：连接建立有成本，所以大量小资源、多个域名和无法复用连接都会增加开销。

## HTTPS 与 TLS

HTTPS = HTTP + TLS。

作用：

- 加密传输内容。
- 防止内容被篡改。
- 验证服务器身份。

常见问题：

- 证书过期。
- 证书域名不匹配。
- 页面 HTTPS，但加载 HTTP 资源，产生混合内容问题。

## HTTP 请求结构

请求由这些部分组成：

- 请求行：方法、路径、协议版本。
- 请求头：元信息。
- 请求体：提交的数据。

常见请求头：

- `Accept`
- `Content-Type`
- `Authorization`
- `Cookie`
- `User-Agent`
- `Origin`
- `Referer`

`Content-Type` 决定请求体格式：

- `application/json`
- `application/x-www-form-urlencoded`
- `multipart/form-data`
- `text/plain`

## HTTP 响应结构

响应包括：

- 状态行。
- 响应头。
- 响应体。

常见响应头：

- `Content-Type`
- `Cache-Control`
- `ETag`
- `Set-Cookie`
- `Location`
- `Access-Control-Allow-Origin`

## HTTP 方法

- `GET`：获取资源。
- `POST`：提交数据或创建资源。
- `PUT`：整体更新资源。
- `PATCH`：部分更新资源。
- `DELETE`：删除资源。
- `OPTIONS`：预检请求。
- `HEAD`：只获取响应头。

注意：方法语义需要前后端约定，浏览器不会自动保证业务安全。

## 常见状态码

2xx：

- `200 OK`：成功。
- `201 Created`：创建成功。
- `204 No Content`：成功但无响应体。

3xx：

- `301 Moved Permanently`：永久重定向。
- `302 Found`：临时重定向。
- `304 Not Modified`：协商缓存命中。

4xx：

- `400 Bad Request`：参数错误。
- `401 Unauthorized`：未认证。
- `403 Forbidden`：无权限。
- `404 Not Found`：资源不存在。
- `405 Method Not Allowed`：方法不允许。
- `409 Conflict`：资源冲突。
- `422 Unprocessable Content`：语义校验失败。
- `429 Too Many Requests`：请求过多。

5xx：

- `500 Internal Server Error`：服务端错误。
- `502 Bad Gateway`：网关错误。
- `503 Service Unavailable`：服务不可用。
- `504 Gateway Timeout`：网关超时。

## GET 与 POST

常见区别：

- GET 通常用于获取数据，参数常在 URL。
- POST 通常用于提交数据，数据常在 body。
- GET 更容易被缓存、收藏、分享。
- POST 更适合创建、提交、触发业务操作。

误区：POST 不天然比 GET 安全。敏感数据必须使用 HTTPS，并做好鉴权和服务端校验。

## HTTP 缓存

缓存分为强缓存和协商缓存。

强缓存：

```http
Cache-Control: max-age=31536000
```

资源未过期时，浏览器直接使用本地缓存，不请求服务器。

协商缓存：

```http
ETag: "abc123"
Last-Modified: Wed, 29 Apr 2026 10:00:00 GMT
```

浏览器下次请求带：

```http
If-None-Match: "abc123"
If-Modified-Since: Wed, 29 Apr 2026 10:00:00 GMT
```

资源没变，服务器返回 `304`。

## Cache-Control 常见值

- `no-cache`：可以缓存，但每次使用前要向服务器确认。
- `no-store`：不缓存。
- `max-age=秒数`：缓存有效期。
- `public`：可被浏览器和代理缓存。
- `private`：只允许浏览器私有缓存。
- `must-revalidate`：过期后必须验证。

静态资源常见策略：文件名带 hash + 长缓存。

HTML 常见策略：短缓存或 no-cache，避免入口文件长期不更新。

## Cookie

Cookie 由服务器通过 `Set-Cookie` 设置，浏览器后续按规则携带。

```http
Set-Cookie: token=abc; Path=/; HttpOnly; Secure; SameSite=Lax
```

属性：

- `Path`：生效路径。
- `Domain`：生效域名。
- `Expires` / `Max-Age`：过期时间。
- `HttpOnly`：禁止 JavaScript 读取，降低 XSS 窃取风险。
- `Secure`：只在 HTTPS 下发送。
- `SameSite`：限制跨站携带，缓解 CSRF。

## Token 鉴权

常见方式：

```http
Authorization: Bearer <token>
```

需要考虑：

- token 存哪里。
- 过期后如何刷新。
- 退出登录如何清除。
- 多标签页如何同步登录态。
- XSS 风险下如何保护 token。

## 跨域与同源策略

同源要求：

- 协议相同。
- 域名相同。
- 端口相同。

不同源请求可能被浏览器限制。CORS 是服务端声明允许跨域访问的机制。

## CORS

常见响应头：

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET,POST,PUT,DELETE
Access-Control-Allow-Headers: Content-Type,Authorization
Access-Control-Allow-Credentials: true
```

如果携带 Cookie：

- 前端请求要设置 `credentials`。
- 服务端不能用 `Access-Control-Allow-Origin: *`。
- 服务端要设置 `Access-Control-Allow-Credentials: true`。

fetch 示例：

```js
fetch('/api/user', {
  credentials: 'include',
});
```

## 简单请求与预检请求

某些跨域请求会先发送 `OPTIONS` 预检请求。

常见触发条件：

- 使用 `PUT`、`DELETE` 等方法。
- 自定义请求头，如 `Authorization`。
- `Content-Type` 不是简单类型。

预检失败时，真正请求不会发出。

## fetch

```js
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
```

注意：`fetch` 只有网络错误才会 reject，HTTP 404/500 不会自动 reject，需要检查 `res.ok`。

## 常见 Content-Type

JSON：

```js
fetch('/api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Ada' }),
});
```

表单：

```js
const formData = new FormData();
formData.append('file', file);

fetch('/upload', {
  method: 'POST',
  body: formData,
});
```

使用 `FormData` 时通常不要手动设置 `Content-Type`，浏览器会自动带 boundary。

## 开发代理

本地开发跨域常用代理：

```js
server: {
  proxy: {
    '/api': {
      target: 'https://api.example.com',
      changeOrigin: true,
    },
  },
}
```

代理只解决开发环境跨域。线上仍然需要正确部署或服务端 CORS。

## CDN

CDN 会把静态资源分发到离用户更近的节点。

适合：

- JS/CSS 构建产物。
- 图片。
- 字体。
- 下载文件。

注意：

- 缓存刷新策略。
- 文件 hash。
- 跨域资源头。
- 图片防盗链。

## 接口排查清单

遇到接口问题时，打开 Network：

1. 请求是否真的发出。
2. URL 是否正确。
3. 方法是否正确。
4. Query、body、headers 是否符合预期。
5. 是否携带 Cookie 或 Authorization。
6. 状态码是什么。
7. 响应体是否有业务错误码。
8. 是否有 CORS 报错。
9. 是否命中缓存。
10. 后端是否收到请求。

## 线上资源 404 排查

常见原因：

- 构建 `base` 配置错误。
- 静态资源没有上传。
- CDN 缓存旧 HTML。
- 路由刷新没有回退到 `index.html`。
- 部署目录和访问路径不一致。

SPA 部署到子目录时，尤其要检查 `base` 和路由模式。

## 面试速查

- HTTP 和 HTTPS 区别：HTTPS 多 TLS，加密、完整性、身份校验。
- 强缓存与协商缓存：前者不请求服务器，后者请求验证资源是否变化。
- 301 和 302：永久重定向和临时重定向。
- 401 和 403：未认证和无权限。
- CORS：服务端通过响应头允许跨域访问。
- Cookie 属性：HttpOnly、Secure、SameSite、Domain、Path、Max-Age。
- fetch 特点：HTTP 错误不会自动 reject。
- GET 和 POST：语义、缓存、参数位置不同，但安全性不由方法本身决定。

前端网络模块最实用的能力是看懂 Network 面板。只要请求的 URL、方法、头、体、状态码、缓存和响应都能解释，大多数网络问题都能定位。
