import type {RequestHandler} from './$types';
import {
  SITE_URL,
  PAGES_SITEMAP_PATH,
  EXTERNAL_SITEMAPS,
} from '$lib/sitemap/config';
import {renderSitemapIndex} from '$lib/sitemap/xml';

export const prerender = true;

/**
 * sitemap index を返す。
 * 自サイトのページ一覧 sitemap と、別サイトの sitemap を束ねる。
 */
export const GET: RequestHandler = async () => {
  const sitemaps = [`${SITE_URL}${PAGES_SITEMAP_PATH}`, ...EXTERNAL_SITEMAPS];

  return new Response(renderSitemapIndex(sitemaps), {
    headers: {'Content-Type': 'application/xml'},
  });
};
