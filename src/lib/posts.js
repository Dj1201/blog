import { posts } from 'virtual:posts';

export { posts };

const categoryOrder = [
  '前端基础',
  '浏览器与网络',
  '工程与框架',
  '工具与资源',
  '博客记录',
  '未分类',
];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(limit = 3) {
  return posts.slice(0, limit);
}

export const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();

export const categories = [...new Set(posts.map((post) => post.category || '未分类'))].sort(
  (a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b, 'zh-CN');
    }

    if (aIndex === -1) {
      return 1;
    }

    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  },
);
