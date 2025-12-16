#!/usr/bin/env tsx

/**
 * ビルド時事前データ取得スクリプト
 * はてなブログからデータを取得してstaticディレクトリに保存
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fetchHatenaBlogPosts } from '../src/lib/api/hatena';

const STATIC_DIR = 'static/data';
const BLOG_DATA_FILE = 'hatena-blog-posts.json';

async function prebuildBlogData() {
	try {
		console.log('🔄 Fetching Hatena blog posts...');
		
		// はてなブログからデータ取得（著者別フィード使用）
		const posts = await fetchHatenaBlogPosts(
			'https://fabercompany-dev.hatenablog.com',
			'kobayashik-faber'
		);
		
		console.log(`✅ Fetched ${posts.length} blog posts`);
		
		// staticディレクトリの作成
		mkdirSync(STATIC_DIR, { recursive: true });
		
		// データをJSONファイルとして保存
		const filePath = join(STATIC_DIR, BLOG_DATA_FILE);
		writeFileSync(filePath, JSON.stringify({
			posts,
			lastUpdated: new Date().toISOString(),
			source: 'Hatena Blog'
		}, null, 2));
		
		console.log(`💾 Blog data saved to ${filePath}`);
		console.log('✨ Prebuild completed successfully');
		
	} catch (error) {
		console.error('❌ Error during prebuild:', error);
		
		// エラー時はフォールバック用の空データを作成
		mkdirSync(STATIC_DIR, { recursive: true });
		const filePath = join(STATIC_DIR, BLOG_DATA_FILE);
		writeFileSync(filePath, JSON.stringify({
			posts: [],
			lastUpdated: new Date().toISOString(),
			source: 'Hatena Blog (fallback)',
			error: error instanceof Error ? error.message : 'Unknown error'
		}, null, 2));
		
		console.log('💾 Fallback empty data saved');
	}
}

// スクリプト実行
if (import.meta.url === `file://${process.argv[1]}`) {
	prebuildBlogData();
}