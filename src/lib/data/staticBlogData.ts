import type {BlogPost} from '$lib/types';

interface BlogDataFile {
  posts: BlogPost[];
  lastUpdated: string;
  source: string;
  error?: string;
}

/**
 * 事前生成された静的ブログデータを読み込み
 * @returns BlogPost配列
 */
export async function getStaticBlogPosts(): Promise<BlogPost[]> {
  try {
    // プリビルドで生成されたJSONファイルを読み込み
    const response = await fetch('/data/hatena-blog-posts.json');

    if (!response.ok) {
      throw new Error(`Failed to load static blog data: ${response.status}`);
    }

    const data: BlogDataFile = await response.json();

    console.log(
      `📖 Loaded ${data.posts.length} blog posts from static data (${data.source})`,
    );
    if (data.error) {
      console.warn('⚠️ Static data was generated with error:', data.error);
    }

    return data.posts;
  } catch (error) {
    console.error('❌ Error loading static blog data:', error);
    return [];
  }
}

/**
 * ビルド時環境判定
 * @returns サーバーサイドかどうか
 */
export function isServerSide(): boolean {
  return typeof window === 'undefined';
}

/**
 * 環境に応じてブログデータを取得
 * サーバーサイド: リアルタイムAPI呼び出し
 * クライアントサイド: 静的データ読み込み
 */
export async function getBlogPostsForEnvironment(): Promise<BlogPost[]> {
  if (isServerSide()) {
    // サーバーサイドでは動的にAPIを呼び出し
    try {
      const {fetchHatenaBlogPosts} = await import('$lib/api/hatena');
      return await fetchHatenaBlogPosts();
    } catch (error) {
      console.error('Error fetching dynamic blog data:', error);
      return [];
    }
  } else {
    // クライアントサイドでは静的データを使用
    return await getStaticBlogPosts();
  }
}
