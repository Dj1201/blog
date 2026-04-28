import { posts } from 'virtual:posts';

export { posts };

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(limit = 3) {
  return posts.slice(0, limit);
}

export const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
