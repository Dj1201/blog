import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const virtualPostsModuleId = 'virtual:posts';
const resolvedVirtualPostsModuleId = '\0virtual:posts';
const rootDir = fileURLToPath(new URL('.', import.meta.url));
const postsDir = path.resolve(rootDir, 'src/posts');

function slugFromFilename(filename) {
	return filename.replace(/\.md$/, '');
}

function normalizeTags(tags) {
	if (!tags) {
		return [];
	}

	return Array.isArray(tags) ? tags : String(tags).split(',').map((tag) => tag.trim());
}

function readingTime(content) {
	const words = content.replace(/<[^>]+>/g, '').trim().length;
	return Math.max(1, Math.ceil(words / 500));
}

function blogPostsPlugin() {
	const markdown = new MarkdownIt({
		html: false,
		linkify: true,
		typographer: true,
	});

	return {
		name: 'blog-posts',
		configureServer(server) {
			server.watcher.add(postsDir);

			const reloadPosts = (file) => {
				if (!file.endsWith('.md') || path.dirname(file) !== postsDir) {
					return;
				}

				const module = server.moduleGraph.getModuleById(resolvedVirtualPostsModuleId);
				if (module) {
					server.moduleGraph.invalidateModule(module);
				}

				server.ws.send({ type: 'full-reload' });
			};

			server.watcher.on('add', reloadPosts);
			server.watcher.on('change', reloadPosts);
			server.watcher.on('unlink', reloadPosts);
		},
		resolveId(id) {
			if (id === virtualPostsModuleId) {
				return resolvedVirtualPostsModuleId;
			}
		},
		load(id) {
			if (id !== resolvedVirtualPostsModuleId) {
				return;
			}

			const files = fs.existsSync(postsDir)
				? fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'))
				: [];

			for (const file of files) {
				this.addWatchFile(path.join(postsDir, file));
			}

			const posts = files
				.map((file) => {
					const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
					const { data, content } = matter(raw);
					const slug = data.slug || slugFromFilename(file);

					return {
						slug,
						title: data.title || slug,
						date: data.date || '',
						excerpt: data.excerpt || '',
						tags: normalizeTags(data.tags),
						readingMinutes: readingTime(content),
						html: markdown.render(content),
					};
				})
				.sort((a, b) => new Date(b.date) - new Date(a.date));

			return `export const posts = ${JSON.stringify(posts)};`;
		},
	};
}

export default defineConfig({
	base: '/blog/',
	plugins: [blogPostsPlugin(), vue()],
});
