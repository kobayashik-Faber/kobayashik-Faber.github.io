import type { PageServerLoad } from './$types';
import { getInternalBlogPost } from '$lib/blog/internal';
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