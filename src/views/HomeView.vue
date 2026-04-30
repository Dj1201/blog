<script setup>
import { computed } from 'vue';
import PostCard from '../components/PostCard.vue';
import { categories, getFeaturedPosts, posts, tags } from '../lib/posts';

const featuredPost = computed(() => getFeaturedPosts(1)[0]);
const recentPosts = computed(() => posts.slice(1, 4));
const sidebarTags = computed(() => tags.slice(0, 8));
</script>

<template>
  <main class="home-main">
    <section class="hero-section" aria-label="博客介绍">
      <div class="hero-overlay"></div>
      <p class="hero-kicker">Personal Blog · Life, Design, Notes</p>
      <div class="hero-copy">
        <h1>把日常写成一座可回看的小岛</h1>
        <p class="hero-text">
          记录前端、设计、阅读、工具和那些不急着抵达的想法。把零散知识整理成文章，也把项目经验沉淀成方法。
        </p>
        <div class="hero-actions">
          <RouterLink class="button primary" to="/posts">阅读文章</RouterLink>
          <RouterLink class="button secondary" to="/about">关于我</RouterLink>
        </div>
      </div>
      <p class="hero-meta-left">Updated Weekly</p>
      <p class="hero-meta-right">By Lin Chu · Shanghai</p>
    </section>

    <section class="editorial-strip" aria-label="博客概览">
      <span>{{ posts.length }} 篇文章</span>
      <span>{{ categories.join(' / ') }}</span>
      <span>每周三更新</span>
      <span>Newsletter · 12K Readers</span>
    </section>

    <section class="content-section editorial-content">
      <article v-if="featuredPost" class="featured-article">
        <div class="featured-copy">
          <p class="eyebrow">Featured Essay</p>
          <h2>{{ featuredPost.title }}</h2>
          <p>{{ featuredPost.excerpt }}</p>
          <div class="article-line">
            <span>{{ featuredPost.readingMinutes }} 分钟阅读</span>
            <span>{{ featuredPost.date }}</span>
          </div>
          <RouterLink class="button primary" :to="`/posts/${featuredPost.slug}`">阅读全文</RouterLink>
        </div>
        <RouterLink class="featured-image" :to="`/posts/${featuredPost.slug}`" aria-label="阅读精选文章"></RouterLink>
      </article>

      <div class="home-columns">
        <section class="latest-column" aria-labelledby="latest-title">
          <div class="section-heading">
            <p class="eyebrow">Latest Writing</p>
            <h2 id="latest-title">最近发布</h2>
          </div>
          <div class="post-list">
            <PostCard v-for="post in recentPosts" :key="post.slug" :post="post" />
          </div>
        </section>

        <aside class="home-sidebar" aria-label="作者与订阅">
          <section class="author-panel">
            <div class="author-photo" aria-hidden="true"></div>
            <h2>林初</h2>
            <p>独立前端开发者，长期写关于界面、工程化、阅读和城市生活的短文。相信好内容需要慢一点，但不必沉重。</p>
            <span>Email · RSS · GitHub</span>
          </section>

          <section class="topic-panel">
            <p class="eyebrow">Topics</p>
            <div class="topic-list">
              <span v-for="tag in sidebarTags" :key="tag">{{ tag }}</span>
            </div>
          </section>

          <section id="newsletter" class="newsletter-panel">
            <p class="eyebrow">周三短札</p>
            <h2>给一周留一点回声</h2>
            <p>三条链接、一个问题和一段近况。每周最多一封，可随时取消订阅。</p>
            <a class="button primary" href="mailto:hello@example.com">加入订阅</a>
          </section>
        </aside>
      </div>
    </section>
  </main>
</template>
