<script setup>
const navItems = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/posts' },
  { label: '关于', to: '/about' },
];
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="返回首页">
        <span class="brand-mark">B</span>
        <span class="brand-text">个人博客</span>
      </RouterLink>

      <nav class="site-nav" aria-label="主导航">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
          {{ item.label }}
        </RouterLink>
      </nav>
    </header>

    <RouterView />

    <footer class="site-footer">
      <span>记录技术、生活和持续生长的想法。</span>
      <span>Powered by Vue 3 + Vite</span>
    </footer>
  </div>
</template>
