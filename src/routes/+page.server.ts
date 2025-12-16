import type { PageServerLoad } from './$types';
import { getLatestBlogPosts } from '$lib/blog/aggregator';

export const load: PageServerLoad = async () => {
	try {
		// サーバーサイドで最新5件のブログ記事を取得
		const latestPosts = await getLatestBlogPosts(5);
		
		return {
			latestPosts
		};
	} catch (error) {
		console.error('Error loading blog posts:', error);
		
		// エラー時はフォールバックとして空配列を返す
		return {
			latestPosts: []
		};
	}
};