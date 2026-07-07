import {SITE_URL, STATIC_ROUTES} from '$lib/sitemap/config';
import {getInternalBlogPosts} from '$lib/blog/internal';
import type {SitemapEntry} from '$lib/sitemap/xml';

/**
 * 日付文字列を W3C Datetime（YYYY-MM-DD）に正規化する
 * @param date frontmatter の date 文字列
 * @returns 正規化した日付。解析できない場合は undefined
 */
function toW3CDate(date: string): string | undefined {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }
  return parsed.toISOString().split('T')[0];
}

/**
 * ルートパスを絶対 URL に変換する
 * @param path 先頭スラッシュ始まりのパス（'/' はトップページ）
 * @returns SITE_URL を基準とした絶対 URL
 */
function toAbsoluteUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * このサイト自身の全ページを sitemap エントリとして取得する
 * 固定ルートと、内部ブログ記事（/blog/[slug]）を統合する。
 * 外部記事（はてなブログ等）は別サイト側のため除外する。
 * @returns sitemap エントリ配列
 */
export async function getSitemapPages(): Promise<SitemapEntry[]> {
  const staticEntries: SitemapEntry[] = STATIC_ROUTES.map((path) => ({
    loc: toAbsoluteUrl(path),
  }));

  const posts = await getInternalBlogPosts();
  const postEntries: SitemapEntry[] = posts
    .filter(
      (post): post is typeof post & {slug: string} =>
        typeof post.slug === 'string',
    )
    .map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: toW3CDate(post.date),
    }));

  return [...staticEntries, ...postEntries];
}
