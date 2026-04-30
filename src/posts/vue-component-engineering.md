---
title: "Vue 3 模块手册：组件、响应式、路由、状态与工程实践"
date: "2026-04-24"
category: "工程与框架"
tags:
  - Vue
  - 组件化
  - 响应式
  - 工程化
excerpt: "系统整理 Vue 3 常用知识：组件拆分、props、emit、响应式、computed、watch、生命周期、路由、状态管理和项目组织。"
---

Vue 的核心价值是把页面拆成组件，并用响应式系统把状态变化映射到界面更新。查询 Vue 问题时，可以按组件、响应式、通信、生命周期、路由、状态管理和工程组织来定位。

## 单文件组件

Vue 单文件组件通常包含：

```vue
<script setup>
const message = 'hello';
</script>

<template>
  <p>{{ message }}</p>
</template>

<style scoped>
p {
  color: #2563eb;
}
</style>
```

`script setup` 是 Vue 3 推荐写法，语法更简洁，顶层变量可以直接在模板中使用。

## 模板语法

插值：

```vue
<p>{{ title }}</p>
```

属性绑定：

```vue
<img :src="cover" :alt="title" />
```

事件绑定：

```vue
<button @click="save">保存</button>
```

条件渲染：

```vue
<p v-if="loading">加载中</p>
<p v-else>加载完成</p>
```

列表渲染：

```vue
<li v-for="post in posts" :key="post.slug">{{ post.title }}</li>
```

`key` 要稳定，不建议用数组下标处理会增删排序的列表。

## ref 与 reactive

`ref` 适合基础值，也适合需要整体替换的数据。

```js
import { ref } from 'vue';

const count = ref(0);
count.value += 1;
```

模板里会自动解包：

```vue
<p>{{ count }}</p>
```

`reactive` 适合对象状态：

```js
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
});
```

经验：

- 基础值用 `ref`。
- 需要整体替换的数据用 `ref`。
- 表单对象可以用 `reactive`。
- 组合式函数返回值常用 `ref`，方便解构。

## computed

`computed` 用于派生状态，有缓存。

```js
const filteredPosts = computed(() => {
  return posts.value.filter((post) => post.title.includes(keyword.value));
});
```

适合：

- 列表筛选。
- 格式化显示。
- 多个状态组合计算。

能用 `computed` 表达的，不要用 `watch` 手动同步。

## watch 与 watchEffect

`watch` 监听明确数据源：

```js
watch(keyword, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});
```

`watchEffect` 自动收集依赖：

```js
watchEffect(() => {
  console.log(keyword.value);
});
```

适合副作用：

- 请求接口。
- 同步 localStorage。
- 操作第三方库。
- 监听路由参数变化。

不要用 watch 维护可以计算出来的状态。

## props

父组件向子组件传数据：

```vue
<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
```

原则：

- props 是只读输入。
- 子组件不要直接修改 props。
- 复杂对象修改要谨慎，避免父子边界混乱。

## emit

子组件通过事件通知父组件：

```vue
<script setup>
const emit = defineEmits(['select']);

function handleClick() {
  emit('select', 1);
}
</script>
```

父组件：

```vue
<PostCard @select="handleSelect" />
```

## v-model

组件双向绑定：

```vue
<CustomInput v-model="keyword" />
```

子组件约定：

- prop：`modelValue`
- event：`update:modelValue`

```js
defineProps({ modelValue: String });
const emit = defineEmits(['update:modelValue']);
```

多个 v-model：

```vue
<UserForm v-model:name="name" v-model:email="email" />
```

## 插槽

默认插槽：

```vue
<Card>
  <p>内容</p>
</Card>
```

具名插槽：

```vue
<template #header>
  <h2>标题</h2>
</template>
```

作用域插槽：

```vue
<template #default="{ item }">
  {{ item.name }}
</template>
```

插槽适合做布局容器和可扩展组件。

## 生命周期

常用钩子：

- `onMounted`：组件挂载后。
- `onUpdated`：响应式更新后。
- `onUnmounted`：组件卸载后。
- `onBeforeMount`
- `onBeforeUpdate`
- `onBeforeUnmount`

示例：

```js
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
```

注册事件、定时器、第三方实例后，要在卸载时清理。

## provide / inject

适合跨层级传递稳定依赖：

```js
provide('theme', theme);
const theme = inject('theme');
```

适合：

- 主题。
- 表单上下文。
- 组件库内部状态。

不要滥用它替代状态管理，否则数据来源会变隐蔽。

## composable

组合式函数用于复用状态逻辑。

```js
export function useSearch(items) {
  const keyword = ref('');
  const result = computed(() => {
    return items.value.filter((item) => item.title.includes(keyword.value));
  });

  return { keyword, result };
}
```

命名通常以 `use` 开头，例如 `useFetch`、`usePagination`、`useDarkMode`。

## 路由

Vue Router 常见概念：

- route：当前路由信息。
- router：路由实例，用于跳转。
- params：路径参数。
- query：查询参数。
- meta：路由元信息。
- guard：导航守卫。

跳转：

```js
router.push('/posts');
router.push({ name: 'post', params: { slug: 'hello' } });
```

监听参数：

```js
watch(
  () => route.params.slug,
  (slug) => {
    loadPost(slug);
  },
);
```

## 状态管理

小项目可以用组件状态和 composable。中大型项目可以使用 Pinia。

Pinia 适合：

- 多页面共享状态。
- 用户信息。
- 权限。
- 购物车。
- 全局配置。

原则：

- 本地组件状态不要过早放全局。
- 全局状态要有清晰模块边界。
- 异步请求和缓存策略要统一。

## 性能优化

Vue 常见优化：

- 列表使用稳定 `key`。
- 大列表分页或虚拟列表。
- 避免在模板里写昂贵计算。
- 派生数据用 `computed`。
- 组件按需懒加载。
- 路由级代码分割。
- `v-if` 和 `v-show` 按场景选择。

`v-if`：切换成本高，初始成本低。适合不频繁切换。

`v-show`：初始渲染，切换 display。适合频繁切换。

## 项目组织

常见目录：

```text
src/
  components/
  views/
  router/
  stores/
  composables/
  services/
  utils/
  styles/
```

建议：

- 页面级组件放 `views`。
- 可复用组件放 `components`。
- 请求封装放 `services`。
- 纯函数放 `utils`。
- 组合式逻辑放 `composables`。

## 常见问题

### 数据变了页面没更新

检查：

- 是否使用 `ref` 或 `reactive`。
- 是否忘记 `.value`。
- 是否直接替换了 reactive 对象引用。
- 是否修改了 props。
- 是否把非响应式数据放进模板。

### computed 和 watch 怎么选

`computed` 用于计算结果，`watch` 用于副作用。

### 为什么列表状态错乱

通常是 `key` 不稳定，尤其是使用数组下标时。

### scoped 样式为什么不生效

检查：

- 选择器是否匹配当前组件。
- 子组件内部结构是否被 scoped 隔离。
- 是否需要 `:deep()`。

## 面试速查

- Vue 3 响应式基于 Proxy。
- `ref` 和 `reactive`：基础值/整体替换用 ref，对象状态可用 reactive。
- computed 有缓存，watch 处理副作用。
- props 单向数据流，emit 子传父。
- v-if 销毁重建，v-show 切换 display。
- keep-alive 缓存组件实例。
- nextTick 用于等待 DOM 更新后执行。

Vue 查询的核心是判断问题属于响应式、组件通信、生命周期、路由还是工程组织。分类之后，解决路径会清楚很多。
