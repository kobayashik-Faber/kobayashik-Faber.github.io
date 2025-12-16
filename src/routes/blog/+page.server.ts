import type { PageServerLoad } from './$types';
import { getAllBlogPosts } from '$lib/blog/aggregator';

export const load: PageServerLoad = async () => {
	try {
		// サーバーサイドで全ブログ記事を取得
		const allPosts = await getAllBlogPosts();
		
		return {
			allPosts
		};
	} catch (error) {
		console.error('Error loading all blog posts:', error);
		
		// エラー時はフォールバックとして空配列を返す
		return {
			allPosts: []
		};
	}
};