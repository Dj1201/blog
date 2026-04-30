<script setup>
import { computed, ref } from 'vue';
import PostCard from '../components/PostCard.vue';
import { categories, posts, tags } from '../lib/posts';

const allCategory = '全部分类';
const allTag = '全部标签';
const activeCategory = ref(allCategory);
const activeTag = ref(allTag);
const searchKeyword = ref('');

const categoryDescriptions = {
  前端基础: 'HTML、CSS、JavaScript 与前端核心概念',
  浏览器与网络: '浏览器机制、HTTP、缓存、跨域和请求排查',
  工程与框架: 'Vue、工程化、性能优化与安全实践',
  工具与资源: '工具箱、常用网站与问题排查清单',
  博客记录: '博客搭建、写作记录和个人沉淀',
};

const normalizedKeyword = computed(() => searchKeyword.value.trim().toLowerCase());

const filteredPosts = computed(() => {
  return posts.filter((post) => {
    const matchesCategory = activeCategory.value === allCategory || post.category === activeCategory.value;
    const matchesTag = activeTag.value === allTag || post.tags.includes(activeTag.value);
    const matchesKeyword =
      !normalizedKeyword.value || post.searchText.toLowerCase().includes(normalizedKeyword.value);

    return matchesCategory && matchesTag && matchesKeyword;
  });
});

const groupedPosts = computed(() => {
  return categories
    .map((category) => ({
      category,
      description: categoryDescriptions[category] || '暂未添加分类说明',
      posts: filteredPosts.value.filter((post) => post.category === category),
    }))
    .filter((group) => group.posts.length > 0);
});

const categoryCounts = computed(() => {
  return categories.map((category) => ({
    category,
    count: posts.filter((post) => post.category === category).length,
    description: categoryDescriptions[category] || '暂未添加分类说明',
  }));
});

function resetFilters() {
  activeCategory.value = allCategory;
  activeTag.value = allTag;
  searchKeyword.value = '';
}
</script>

<template>
  <main class="page-main">
    <section class="page-heading">
      <p class="eyebrow">Frontend Knowledge Base</p>
      <h1>前端知识查询</h1>
      <p>按知识大类、标签和关键词检索文章。可以直接搜索 DOM、闭包、跨域、缓存、Flex、Vue 响应式、性能优化等关键词。</p>
    </section>

    <section class="knowledge-search" aria-label="知识库搜索">
      <label for="knowledge-search-input">搜索知识点</label>
      <div class="knowledge-search-row">
        <input
          id="knowledge-search-input"
          v-model="searchKeyword"
          type="search"
          placeholder="输入关键词，例如：事件循环、BFC、CORS、Promise、重绘、Pinia"
        />
        <button type="button" @click="resetFilters">重置</button>
      </div>
      <p>
        当前匹配 <strong>{{ filteredPosts.length }}</strong> 篇，共 <strong>{{ posts.length }}</strong> 篇。
      </p>
    </section>

    <section class="category-filter" aria-label="文章大类">
      <button
        type="button"
        :class="{ active: activeCategory === allCategory }"
        @click="activeCategory = allCategory"
      >
        <span>全部分类</span>
        <strong>{{ posts.length }}</strong>
      </button>
      <button
        v-for="item in categoryCounts"
        :key="item.category"
        type="button"
        :class="{ active: activeCategory === item.category }"
        @click="activeCategory = item.category"
      >
        <span>{{ item.category }}</span>
        <small>{{ item.description }}</small>
        <strong>{{ item.count }}</strong>
      </button>
    </section>

    <section class="filter-bar" aria-label="文章标签">
      <button
        type="button"
        :class="{ active: activeTag === allTag }"
        @click="activeTag = allTag"
      >
        全部标签
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

    <section v-if="groupedPosts.length" class="post-groups">
      <div v-for="group in groupedPosts" :key="group.category" class="post-group">
        <header class="post-group-heading">
          <div>
            <p class="eyebrow">Category</p>
            <h2>{{ group.category }}</h2>
            <p>{{ group.description }}</p>
          </div>
          <span>{{ group.posts.length }} 篇</span>
        </header>
        <div class="post-list">
          <PostCard v-for="post in group.posts" :key="post.slug" :post="post" />
        </div>
      </div>
    </section>

    <section v-else class="empty-state">
      <p class="eyebrow">Empty</p>
      <h2>没有匹配的文章</h2>
      <p>换一个关键词、分类或标签试试。</p>
    </section>
  </main>
</template>
