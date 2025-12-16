import type { BlogPost } from '$lib/types';
import { parseStringPromise } from 'xml2js';

/**
 * はてなブログのRSSフィードから記事データを取得
 * @param blogUrl はてなブログのベースURL  
 * @param author 著者名 (著者別フィードURL用)
 * @returns BlogPost配列
 */
export async function fetchHatenaBlogPosts(
	blogUrl: string = 'https://fabercompany-dev.hatenablog.com',
	author: string = 'kobayashik-faber'
): Promise<BlogPost[]> {
	try {
		// 著者別フィードURLを使用
		const rssUrl = `${blogUrl}/feed/author/${author}`;
		const response = await fetch(rssUrl);
		
		if (!response.ok) {
			throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
		}

		const xmlText = await response.text();
		return await parseRssToBlogs(xmlText);
	} catch (error) {
		console.error('Error fetching Hatena blog posts:', error);
		return []; // フォールバック: 空配列を返す
	}
}

/**
 * RSS XMLを解析してBlogPost配列に変換
 * @param xmlText RSS XMLテキスト
 * @returns BlogPost配列
 */
async function parseRssToBlogs(xmlText: string): Promise<BlogPost[]> {
	try {
		// xml2jsを使用してXMLを解析
		const result = await parseStringPromise(xmlText);
		
		// RSS形式とAtom形式の両方に対応
		const items = result.rss?.channel?.[0]?.item || result.feed?.entry || [];
		const blogPosts: BlogPost[] = [];
		

		for (const item of items) {
			// RSS形式とAtom形式の違いを考慮
			const isAtom = !!result.feed;
			
			const title = isAtom 
				? (typeof item.title?.[0] === 'string' ? item.title[0] : item.title?.[0]?._)?.trim()
				: item.title?.[0]?.trim();
			
			const link = isAtom
				? item.link?.[0]?.$?.href || item.link?.[0]?.href
				: item.link?.[0]?.trim();
			
			const description = isAtom
				? (item.content?.[0]?._ || item.content?.[0] || item.summary?.[0]?._ || item.summary?.[0])
				: item.description?.[0]?.trim();
			
			const pubDateText = isAtom
				? (item.published?.[0] || item.updated?.[0])
				: item.pubDate?.[0]?.trim();
			
			const categories = isAtom
				? (item.category || []).map((cat: any) => 
					typeof cat === 'string' ? cat : cat.$?.term || cat.term || ''
				  ).filter(Boolean)
				: (item.category || []).map((cat: string) => cat.trim()).filter(Boolean);


			// 必須フィールドの検証
			if (!title || !link || !pubDateText) {
				continue; // スキップ
			}

			// 日付の解析
			const pubDate = new Date(pubDateText);
			if (isNaN(pubDate.getTime())) {
				continue; // 無効な日付の場合はスキップ
			}

			// 抜粋の生成（HTMLタグを除去して150文字まで）
			const excerpt = extractExcerpt(description || '', 150);

			const blogPost: BlogPost = {
				id: `hatena-${extractIdFromUrl(link)}`,
				title,
				excerpt,
				date: formatDate(pubDate),
				url: link,
				isExternal: true,
				categories,
				source: 'Hatena Blog'
			};

			blogPosts.push(blogPost);
		}

		// 日付順（新しい順）でソート
		return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	} catch (error) {
		console.error('Error parsing RSS XML:', error);
		return [];
	}
}

/**
 * HTMLタグを除去して抜粋を生成
 * @param html HTMLコンテンツ
 * @param maxLength 最大文字数
 * @returns プレーンテキストの抜粋
 */
function extractExcerpt(html: string, maxLength: number = 150): string {
	// HTMLタグを除去
	const textContent = html.replace(/<[^>]*>/g, '');
	
	// HTMLエンティティをデコード
	const decoded = textContent
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");

	// 改行や連続する空白を正規化
	const normalized = decoded.replace(/\s+/g, ' ').trim();

	// 指定した文字数で切り詰め
	if (normalized.length <= maxLength) {
		return normalized;
	}

	return normalized.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * URLからユニークなIDを抽出
 * @param url 記事のURL
 * @returns 記事ID
 */
function extractIdFromUrl(url: string): string {
	try {
		const urlObj = new URL(url);
		// パスの最後の部分をIDとして使用
		const pathSegments = urlObj.pathname.split('/').filter(Boolean);
		return pathSegments[pathSegments.length - 1] || 'unknown';
	} catch {
		// URLの解析に失敗した場合は、URLからハッシュを生成
		return url.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
	}
}

/**
 * Dateオブジェクトを YYYY-MM-DD 形式の文字列に変換
 * @param date Dateオブジェクト
 * @returns YYYY-MM-DD形式の日付文字列
 */
function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

/**
 * はてなブログの記事データをビルド時に取得するヘルパー関数
 * @returns BlogPost配列のPromise
 */
export async function getHatenaBlogPostsAtBuildTime(): Promise<BlogPost[]> {
	if (typeof window !== 'undefined') {
		// クライアントサイドでは空配列を返す（サーバーサイドでのみ実行）
		return [];
	}

	return await fetchHatenaBlogPosts();
}