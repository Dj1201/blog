<script setup>
import { computed, ref } from 'vue';
import PostCard from '../components/PostCard.vue';
import { posts, tags } from '../lib/posts';

const activeTag = ref('全部');

const filteredPosts = computed(() => {
  if (activeTag.value === '全部') {
    return posts;
  }

  return posts.filter((post) => post.tags.includes(activeTag.value));
});
</script>

<template>
  <main class="page-main">
    <section class="page-heading">
      <p class="eyebrow">Archive</p>
      <h1>文章</h1>
      <p>按时间整理所有文章，也可以通过标签快速筛选。</p>
    </section>

    <section class="filter-bar" aria-label="文章标签">
      <button
        type="button"
        :class="{ active: activeTag === '全部' }"
        @click="activeTag = '全部'"
      >
        全部
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        :class="{ active: activeTag === tag }"
        @click="activeTag = tag"
      >
        {{ tag }}
      </button>
    </section>

    <section class="post-list">
      <PostCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
    </section>
  </main>
</template>
