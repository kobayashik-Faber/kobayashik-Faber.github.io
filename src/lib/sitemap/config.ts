/**
 * sitemap 生成の設定値。
 *
 * サイト全体で参照するオリジンや、sitemap index に束ねる sitemap の一覧を
 * ここで一元管理する。
 */

/**
 * 本番サイトのオリジン（末尾スラッシュなし）。
 * sitemap の <loc> はすべてこの絶対 URL を基準に組み立てる。
 */
export const SITE_URL = 'https://kobayashik-faber.github.io';

/**
 * このサイト自身のページ一覧 sitemap のパス。
 * sitemap index（/sitemap.xml）から参照される。
 */
export const PAGES_SITEMAP_PATH = '/sitemap-pages.xml';

/**
 * +page.svelte が存在する固定ルート（動的でないページ）。
 * ルートを追加したらここに 1 行足す。
 * 動的な /blog/[slug] は別途 Markdown から自動列挙するためここには含めない。
 */
export const STATIC_ROUTES = ['/', '/about', '/blog', '/contact'] as const;

/**
 * sitemap index に追加で束ねる「別サイト」の sitemap URL。
 *
 * 例）サブディレクトリ運用している別リポジトリのサイトを足す場合:
 *   `${SITE_URL}/<subdir>/sitemap.xml`
 * 別ドメインなら完全 URL をそのまま記載する:
 *   'https://example.com/sitemap.xml'
 *
 * ここに 1 行追加するだけで /sitemap.xml（index）へ反映される。
 */
export const EXTERNAL_SITEMAPS: readonly string[] = [
  // `${SITE_URL}/subdir/sitemap.xml`,
];
