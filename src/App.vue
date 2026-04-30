<script setup>
const navItems = [
  { label: '文章', to: '/posts' },
  { label: '随笔', to: '/' },
  { label: '关于', to: '/about' },
];
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="返回首页">
        <span class="brand-text">林初 / Field Notes</span>
      </RouterLink>

      <nav class="site-nav" aria-label="主导航">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
          {{ item.label }}
        </RouterLink>
        <a class="nav-cta" href="/#newsletter">订阅</a>
      </nav>
    </header>

    <RouterView />

    <footer class="site-footer">
      <span>© 2026 林初的慢记</span>
      <span>Archive · RSS · Contact</span>
    </footer>
  </div>
</template>
