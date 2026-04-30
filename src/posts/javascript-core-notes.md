---
title: "JavaScript 模块手册：类型、作用域、原型、异步与模块化"
date: "2026-04-26"
category: "前端基础"
tags:
  - JavaScript
  - 异步
  - 前端
excerpt: "系统整理 JavaScript 核心知识：数据类型、作用域、闭包、this、原型、事件循环、Promise、模块化和常见问题。"
---

JavaScript 是前端交互和业务逻辑的核心。查询 JS 知识时，可以按这条线索组织：数据如何表示、变量在哪里可见、函数如何执行、对象如何继承、异步如何调度、模块如何拆分。

## 数据类型

JavaScript 类型分为原始类型和引用类型。

原始类型：

- `string`
- `number`
- `boolean`
- `undefined`
- `null`
- `symbol`
- `bigint`

引用类型：

- `object`
- `array`
- `function`
- `date`
- `regexp`
- `map`
- `set`

常见判断：

```js
typeof 'hello'; // 'string'
typeof 1; // 'number'
typeof null; // 'object'
Array.isArray([]); // true
Object.prototype.toString.call(new Date()); // '[object Date]'
```

`typeof null` 返回 `'object'` 是历史遗留问题。

## 原始值与引用值

原始值按值比较，引用值按引用地址比较。

```js
1 === 1; // true
[] === []; // false
{} === {}; // false
```

对象赋值复制的是引用：

```js
const a = { count: 1 };
const b = a;
b.count = 2;

console.log(a.count); // 2
```

## 类型转换

建议使用显式转换，少依赖隐式转换。

```js
Number('123');
String(123);
Boolean(value);
```

常见假值：

- `false`
- `0`
- `''`
- `null`
- `undefined`
- `NaN`

其他大多数值都是真值，包括空数组 `[]` 和空对象 `{}`。

## var、let、const

区别：

- `var`：函数作用域，有变量提升，可重复声明。
- `let`：块级作用域，可重新赋值。
- `const`：块级作用域，不可重新绑定。

优先使用 `const`，需要重新赋值再用 `let`。尽量避免 `var`。

注意：`const` 限制的是绑定关系，不是对象内容。

```js
const user = { name: 'Ada' };
user.name = 'Grace'; // 可以
```

## 作用域

作用域决定变量在哪里可以访问。

- 全局作用域
- 函数作用域
- 块级作用域
- 模块作用域

```js
if (true) {
  const message = 'hello';
}

console.log(message); // ReferenceError
```

## 作用域链

函数访问变量时，会先在当前作用域找，找不到就向外层作用域查找。

```js
const name = 'outer';

function say() {
  const prefix = 'hello';
  console.log(prefix, name);
}
```

这条查找链就是作用域链。

## 闭包

闭包是函数和它创建时词法环境的组合。简单说，函数可以记住外层作用域里的变量。

```js
function createCounter() {
  let count = 0;

  return function add() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```

用途：

- 保存私有状态。
- 函数工厂。
- 防抖、节流。
- 模块封装。

风险：

- 长期持有大对象可能导致内存无法及时释放。
- 循环里闭包容易捕获同一个变量，现代代码用 `let` 可减少问题。

## this

`this` 取决于函数调用方式。

```js
const user = {
  name: 'Ada',
  say() {
    console.log(this.name);
  },
};

user.say(); // Ada
```

常见规则：

- 普通函数直接调用：非严格模式下指向全局对象，严格模式下是 `undefined`。
- 对象方法调用：指向调用者对象。
- `new` 调用：指向新创建的实例。
- `call`、`apply`、`bind`：显式指定。
- 箭头函数：没有自己的 `this`，捕获外层 `this`。

## call、apply、bind

```js
function greet(word) {
  return `${word}, ${this.name}`;
}

greet.call({ name: 'Ada' }, 'Hi');
greet.apply({ name: 'Ada' }, ['Hi']);

const bound = greet.bind({ name: 'Ada' });
bound('Hi');
```

区别：

- `call`：参数逐个传。
- `apply`：参数数组传。
- `bind`：返回一个绑定后的新函数。

## 原型与原型链

每个对象都有原型。访问属性时，如果对象自身没有，会沿着原型链向上找。

```js
const obj = {};
Object.getPrototypeOf(obj) === Object.prototype;
```

构造函数与原型：

```js
function Person(name) {
  this.name = name;
}

Person.prototype.say = function () {
  return this.name;
};

const p = new Person('Ada');
```

`class` 是语法糖，底层仍基于原型机制。

## class

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    return this.name;
  }
}
```

继承：

```js
class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
```

## 数组常用方法

不改变原数组：

- `map`
- `filter`
- `slice`
- `concat`
- `find`
- `some`
- `every`
- `reduce`

会改变原数组：

- `push`
- `pop`
- `shift`
- `unshift`
- `splice`
- `sort`
- `reverse`

注意 `sort` 默认按字符串排序：

```js
[10, 2, 1].sort(); // [1, 10, 2]
[10, 2, 1].sort((a, b) => a - b); // [1, 2, 10]
```

## 对象常用方法

```js
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
Object.assign({}, obj);
Object.hasOwn(obj, 'name');
```

浅拷贝：

```js
const copy = { ...obj };
```

深拷贝可以用：

```js
const copy = structuredClone(obj);
```

注意：函数、DOM 节点、某些特殊对象不能简单深拷贝。

## Promise

Promise 表示一个异步操作的最终结果。

状态：

- `pending`
- `fulfilled`
- `rejected`

```js
fetch('/api/posts')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

常用静态方法：

- `Promise.resolve`
- `Promise.reject`
- `Promise.all`
- `Promise.allSettled`
- `Promise.race`
- `Promise.any`

`Promise.all` 任意一个失败就失败。`Promise.allSettled` 会等所有任务结束。

## async / await

`async / await` 是 Promise 的语法糖，让异步代码更像同步流程。

```js
async function loadPosts() {
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) {
      throw new Error('请求失败');
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
```

并发请求不要误写成串行：

```js
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
```

## 事件循环

简化理解：

1. 执行同步代码。
2. 清空微任务队列。
3. 执行一个宏任务。
4. 再清空微任务队列。
5. 如此循环。

微任务：

- Promise 回调
- `queueMicrotask`
- MutationObserver

宏任务：

- `setTimeout`
- `setInterval`
- DOM 事件
- 网络回调

示例：

```js
console.log('A');
Promise.resolve().then(() => console.log('B'));
setTimeout(() => console.log('C'), 0);
console.log('D');
```

输出：`A D B C`。

## 防抖与节流

防抖：连续触发时只执行最后一次。

```js
function debounce(fn, delay = 300) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

节流：一段时间内最多执行一次。

```js
function throttle(fn, delay = 300) {
  let last = 0;

  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
}
```

用途：

- 搜索输入：防抖。
- 滚动监听：节流。
- 窗口 resize：防抖或节流。

## 模块化

ES Module：

```js
export function formatDate(date) {
  return new Intl.DateTimeFormat('zh-CN').format(date);
}

import { formatDate } from './date.js';
```

特点：

- 静态分析。
- 默认严格模式。
- 支持 tree shaking。
- 每个模块有独立作用域。

CommonJS：

```js
module.exports = {};
const mod = require('./mod');
```

Node 生态里仍能看到 CommonJS，但现代前端项目主要使用 ESM。

## 错误处理

同步错误：

```js
try {
  risky();
} catch (error) {
  console.error(error);
}
```

异步错误：

```js
async function run() {
  try {
    await task();
  } catch (error) {
    console.error(error);
  }
}
```

不要吞掉错误。至少要记录日志，用户侧也应该有兜底反馈。

## 常见坑

### 0.1 + 0.2 不等于 0.3

浮点数精度问题：

```js
0.1 + 0.2 === 0.3; // false
```

金额计算建议用整数分或专门的 decimal 库。

### NaN 不等于自己

```js
NaN === NaN; // false
Number.isNaN(NaN); // true
```

### forEach 不能 await

```js
items.forEach(async (item) => {
  await save(item);
});
```

这不会按预期等待所有任务。可以用：

```js
await Promise.all(items.map((item) => save(item)));
```

或需要串行时：

```js
for (const item of items) {
  await save(item);
}
```

## 面试速查

- 闭包：函数记住创建时的词法作用域。
- 原型链：属性查找会沿原型向上查。
- this：由调用方式决定，箭头函数捕获外层 this。
- Promise：异步状态容器，状态一旦改变不可逆。
- async/await：Promise 语法糖。
- 事件循环：同步代码、微任务、宏任务的调度机制。
- 防抖：只执行最后一次。节流：固定时间最多执行一次。
- 深浅拷贝：浅拷贝只复制一层引用，深拷贝递归复制结构。

JavaScript 查询时最重要的是先确定问题属于类型、作用域、对象、异步还是模块边界。分类清楚后，很多问题就能快速定位。
