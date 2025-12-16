import type { BlogPost } from '$lib/types';
import { getBlogPostsForEnvironment } from '$lib/data/staticBlogData';
import { getInternalBlogPostsForEnvironment } from '$lib/blog/internal';

/**
 * 内部記事と外部記事（はてなブログ）を統合して取得
 * @returns 統合された BlogPost 配列（日付順）
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
	try {
		// 内部記事と外部記事を並行取得
		const [internalPosts, externalPosts] = await Promise.all([
			getInternalBlogPostsForEnvironment(),
			getBlogPostsForEnvironment()
		]);

		// 記事を統合
		const allPosts = [...internalPosts, ...externalPosts];

		// 日付順（新しい順）でソート
		return allPosts.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB.getTime() - dateA.getTime();
		});

	} catch (error) {
		console.error('Error aggregating blog posts:', error);
		return [];
	}
}

/**
 * 最新のブログ記事を指定件数取得（カルーセル用）
 * @param count 取得件数（デフォルト: 5）
 * @returns 最新の BlogPost 配列
 */
export async function getLatestBlogPosts(count: number = 5): Promise<BlogPost[]> {
	const allPosts = await getAllBlogPosts();
	return allPosts.slice(0, count);
}

/**
 * 記事タイプ別にフィルタリング
 * @param posts BlogPost配列
 * @param isExternal true: 外部記事のみ, false: 内部記事のみ, undefined: 全て
 * @returns フィルタリングされた BlogPost 配列
 */
export function filterPostsByType(
	posts: BlogPost[], 
	isExternal?: boolean
): BlogPost[] {
	if (isExternal === undefined) {
		return posts;
	}
	
	return posts.filter(post => post.isExternal === isExternal);
}

/**
 * カテゴリ別にフィルタリング
 * @param posts BlogPost配列
 * @param category カテゴリ名
 * @returns フィルタリングされた BlogPost 配列
 */
export function filterPostsByCategory(
	posts: BlogPost[], 
	category: string
): BlogPost[] {
	return posts.filter(post => 
		post.categories?.some(cat => 
			cat.toLowerCase().includes(category.toLowerCase())
		)
	);
}

/**
 * キーワードで記事を検索
 * @param posts BlogPost配列
 * @param keyword 検索キーワード
 * @returns マッチした BlogPost 配列
 */
export function searchPosts(
	posts: BlogPost[], 
	keyword: string
): BlogPost[] {
	const lowerKeyword = keyword.toLowerCase();
	
	return posts.filter(post => 
		post.title.toLowerCase().includes(lowerKeyword) ||
		post.excerpt.toLowerCase().includes(lowerKeyword) ||
		post.categories?.some(cat => 
			cat.toLowerCase().includes(lowerKeyword)
		)
	);
}