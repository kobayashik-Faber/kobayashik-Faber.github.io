import type {RequestHandler} from './$types';
import {getSitemapPages} from '$lib/sitemap/pages';
import {renderUrlset} from '$lib/sitemap/xml';

export const prerender = true;

/**
 * このサイト自身のページ一覧 sitemap（urlset）を返す。
 */
export const GET: RequestHandler = async () => {
  const entries = await getSitemapPages();

  return new Response(renderUrlset(entries), {
    headers: {'Content-Type': 'application/xml'},
  });
};
