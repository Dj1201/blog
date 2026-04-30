---
title: "前端安全与调试模块手册：XSS、CSRF、鉴权、错误处理与排查"
date: "2026-04-22"
category: "工程与框架"
tags:
  - 安全
  - 调试
  - 前端
excerpt: "系统整理前端安全与调试知识：XSS、CSRF、CSP、Cookie 安全、依赖安全、错误处理、日志和排查流程。"
---

前端安全和调试能力决定项目能不能稳定上线、出问题能不能快速定位。安全不是只靠后端，调试也不是只看 console。前端需要理解浏览器安全模型、数据入口、鉴权方式和错误排查链路。

## XSS

XSS 是攻击者把恶意脚本注入页面。

常见入口：

- 用户昵称。
- 评论内容。
- 富文本。
- URL 参数。
- 第三方脚本。
- 服务端返回的 HTML。

危险写法：

```js
container.innerHTML = userInput;
```

防护：

- 默认转义用户输入。
- 谨慎使用 `innerHTML`。
- 富文本使用白名单过滤。
- 使用 CSP 限制脚本来源。
- Cookie 设置 `HttpOnly`，降低 token 被 JS 读取的风险。

## CSRF

CSRF 是攻击者诱导已登录用户发起非本人意愿的请求。

常见防护：

- SameSite Cookie。
- CSRF Token。
- 验证 Origin / Referer。
- 敏感操作二次确认。
- 不用 GET 做有副作用操作。

如果登录态依赖 Cookie，必须关注 CSRF。

## CSP

CSP 用响应头限制页面能加载哪些资源。

示例：

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
```

作用：

- 限制脚本来源。
- 限制图片、样式、字体来源。
- 降低 XSS 危害。
- 上报违规资源。

CSP 配置要结合项目资源来源，不能随便复制。

## Cookie 安全

关键属性：

- `HttpOnly`：禁止 JS 读取。
- `Secure`：只在 HTTPS 发送。
- `SameSite`：限制跨站携带。
- `Path`：限制路径。
- `Domain`：限制域名。

示例：

```http
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Lax; Path=/
```

## Token 安全

常见风险：

- token 存 localStorage 被 XSS 读取。
- token 过期刷新逻辑混乱。
- 退出登录没有清理。
- 多标签页状态不同步。
- 请求日志泄露 token。

建议：

- 不把敏感 token 放 URL。
- 请求失败时区分 401 和 403。
- 退出登录清理本地状态。
- 刷新 token 要防止并发重复刷新。

## 依赖安全

前端依赖多，供应链风险真实存在。

检查：

- 依赖是否长期无人维护。
- 是否有安全漏洞。
- 是否引入过大的间接依赖。
- 是否锁定版本。
- 是否从可信 registry 安装。

命令：

```bash
npm audit
yarn audit
```

不要为了一个小函数引入不可信大依赖。

## 输入校验

前端校验负责体验，服务端校验负责安全。

前端可以做：

- 必填校验。
- 格式提示。
- 长度限制。
- 提交前确认。

服务端必须做：

- 权限校验。
- 数据合法性校验。
- 防注入处理。
- 业务规则校验。

## 错误处理

请求错误：

```js
async function request(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}
```

组件错误：

- 展示兜底 UI。
- 提供重试。
- 记录错误日志。
- 不让整页白屏。

异步错误不要吞掉：

```js
try {
  await save();
} catch (error) {
  console.error(error);
  showToast('保存失败，请稍后重试');
}
```

## 日志与监控

建议记录：

- JS 运行时错误。
- Promise 未处理错误。
- 接口错误。
- 页面性能指标。
- 用户关键行为。

注意：

- 不记录密码、token、身份证等敏感信息。
- 日志要带页面、版本、用户环境、错误堆栈。
- 上报要采样，避免雪崩。

## 调试流程

通用步骤：

1. 复现问题。
2. 明确预期和实际结果。
3. 看 Console 是否有报错。
4. 看 Network 请求是否正常。
5. 看 Elements 样式和 DOM。
6. 看 Application 里的 Cookie 和 Storage。
7. 缩小到最小复现。
8. 修复后验证相关场景。

## 常见问题排查

### 页面白屏

检查：

- JS 是否加载 404。
- Console 是否有语法或运行时报错。
- 路由是否匹配。
- 部署 base 是否正确。
- 环境变量是否缺失。

### 登录失效

检查：

- Cookie 是否存在。
- SameSite/Secure 是否导致未携带。
- token 是否过期。
- 接口是否返回 401。
- 前端是否错误清理状态。

### 跨域报错

检查：

- 响应头是否有 CORS 配置。
- 预检 OPTIONS 是否成功。
- 是否携带 credentials。
- Origin 是否被允许。

### 样式异常

检查：

- CSS 是否加载。
- 选择器是否匹配。
- 是否被覆盖。
- 是否受 scoped、层叠上下文、媒体查询影响。

## 面试速查

- XSS：脚本注入，防护靠转义、白名单、CSP、HttpOnly。
- CSRF：跨站请求伪造，防护靠 SameSite、Token、Origin 校验。
- HttpOnly：禁止 JS 读取 Cookie。
- Secure：只在 HTTPS 发送 Cookie。
- SameSite：限制跨站携带 Cookie。
- CSP：限制资源来源，降低注入风险。
- 401 与 403：未认证与无权限。
- 前端校验不能替代服务端校验。

安全让项目少出事故，调试让事故可定位。两者都是前端知识库里必须能查到的基础能力。
