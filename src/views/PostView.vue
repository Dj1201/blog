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

function scrollToHeading(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
</script>

<template>
  <main v-if="post" class="article-main">
    <RouterLink class="back-link" to="/posts">返回文章列表</RouterLink>
    <div class="article-layout">
      <article class="article">
        <header class="article-header">
          <time :datetime="post.date">{{ post.date }}</time>
          <h1>{{ post.title }}</h1>
          <p>{{ post.excerpt }}</p>
          <div class="post-meta">
            <span class="category-pill">{{ post.category }}</span>
            <span>{{ post.readingMinutes }} 分钟阅读</span>
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </header>
        <div class="markdown-body" v-html="post.html"></div>
      </article>

      <aside v-if="post.headings?.length" class="article-toc" aria-label="文章目录">
        <p class="eyebrow">On This Page</p>
        <h2>文章目录</h2>
        <nav>
          <button
            v-for="heading in post.headings"
            :key="heading.id"
            type="button"
            :class="`depth-${heading.depth}`"
            @click="scrollToHeading(heading.id)"
          >
            {{ heading.text }}
          </button>
        </nav>
      </aside>
    </div>
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
