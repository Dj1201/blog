<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="post-card">
    <RouterLink class="post-card-link" :to="`/posts/${post.slug}`">
      <time :datetime="post.date">{{ post.date }}</time>
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
      <div class="post-meta">
        <span>{{ post.readingMinutes }} 分钟阅读</span>
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </RouterLink>
  </article>
</template>
