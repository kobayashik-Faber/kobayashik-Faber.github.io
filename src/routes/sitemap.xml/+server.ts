import type {RequestHandler} from './$types';
import {getSitemapPages} from '$lib/sitemap/pages';
import {renderUrlset} from '$lib/sitemap/xml';

export const prerender = true;

/**
 * このサイト自身のページ一覧 sitemap（urlset）を返す。
 * 別サイト（サブディレクトリ運用）の sitemap は robots.txt から参照する。
 */
export const GET: RequestHandler = async () => {
  const entries = await getSitemapPages();

  return new Response(renderUrlset(entries), {
    headers: {'Content-Type': 'application/xml'},
  });
};
