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

function slugFromHeading(text, usedSlugs) {
	const baseSlug = text
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '') || 'section';

	const count = usedSlugs.get(baseSlug) || 0;
	usedSlugs.set(baseSlug, count + 1);

	return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
}

function blogPostsPlugin() {
	const markdown = new MarkdownIt({
		html: false,
		linkify: true,
		typographer: true,
	});

	markdown.renderer.rules.heading_open = (tokens, index, options, env, self) => {
		const token = tokens[index];
		const level = Number(token.tag.slice(1));

		if (level >= 2 && level <= 3) {
			const title = tokens[index + 1]?.content || '';
			const usedSlugs = env.usedSlugs || new Map();
			env.usedSlugs = usedSlugs;

			const id = slugFromHeading(title, usedSlugs);
			token.attrSet('id', id);
			env.headings?.push({ depth: level, text: title, id });
		}

		return self.renderToken(tokens, index, options);
	};

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
					const renderEnv = { headings: [], usedSlugs: new Map() };
					const html = markdown.render(content, renderEnv);

					return {
						slug,
						title: data.title || slug,
						date: data.date || '',
						category: data.category || '未分类',
						excerpt: data.excerpt || '',
						tags: normalizeTags(data.tags),
						readingMinutes: readingTime(content),
						searchText: [
							data.title || slug,
							data.category || '未分类',
							data.excerpt || '',
							normalizeTags(data.tags).join(' '),
							content,
						].join(' '),
						headings: renderEnv.headings,
						html,
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
