<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { getPost } from '../lib/posts';

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const post = computed(() => getPost(props.slug));
</script>

<template>
  <main v-if="post" class="article-main">
    <RouterLink class="back-link" to="/posts">返回文章列表</RouterLink>
    <article class="article">
      <header class="article-header">
        <time :datetime="post.date">{{ post.date }}</time>
        <h1>{{ post.title }}</h1>
        <p>{{ post.excerpt }}</p>
        <div class="post-meta">
          <span>{{ post.readingMinutes }} 分钟阅读</span>
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>
      <div class="markdown-body" v-html="post.html"></div>
    </article>
  </main>

  <main v-else class="page-main">
    <section class="empty-state">
      <p class="eyebrow">404</p>
      <h1>文章不存在</h1>
      <p>可能是链接写错了，或者这篇文章还没有发布。</p>
      <RouterLink class="button primary" to="/posts">返回文章列表</RouterLink>
    </section>
  </main>
</template>
