import type { PageServerLoad, EntryGenerator } from './$types';
import { getInternalBlogPost, getAllInternalBlogPosts } from '$lib/blog/internal';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { slug } = params;
		
		// 内部記事を取得
		const result = await getInternalBlogPost(slug);
		
		if (!result) {
			throw error(404, 'Blog post not found');
		}

		return {
			post: result.post,
			content: result.content
		};
		
	} catch (err) {
		console.error(`Error loading blog post "${params.slug}":`, err);
		throw error(404, 'Blog post not found');
	}
};

export const entries: EntryGenerator = async () => {
	const posts = await getAllInternalBlogPosts();
	return posts.map(post => ({ slug: post.slug }));
};

export const prerender = true;