<script setup>
import PostCard from '../components/PostCard.vue';
import { getFeaturedPosts, tags } from '../lib/posts';

const featuredPosts = getFeaturedPosts(3);
</script>

<template>
  <main>
    <section class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">Personal Blog</p>
        <h1>把学到的东西写下来，让思考慢慢长出形状。</h1>
        <p class="hero-text">
          这里会记录技术实践、项目复盘、读书笔记和一些日常观察。保持输出，也保持好奇。
        </p>
        <div class="hero-actions">
          <RouterLink class="button primary" to="/posts">阅读文章</RouterLink>
          <RouterLink class="button secondary" to="/about">关于我</RouterLink>
        </div>
      </div>

      <aside class="hero-note" aria-label="博客主题">
        <span v-for="tag in tags" :key="tag">{{ tag }}</span>
      </aside>
    </section>

    <section class="content-section">
      <div class="section-heading">
        <p class="eyebrow">Latest Posts</p>
        <h2>最新文章</h2>
      </div>
      <div class="post-grid">
        <PostCard v-for="post in featuredPosts" :key="post.slug" :post="post" />
      </div>
    </section>
  </main>
</template>
