/**
 * sitemap 生成の設定値。
 */

/**
 * 本番サイトのオリジン（末尾スラッシュなし）。
 * sitemap の <loc> はすべてこの絶対 URL を基準に組み立てる。
 */
export const SITE_URL = 'https://kobayashik-faber.github.io';

/**
 * +page.svelte が存在する固定ルート（動的でないページ）。
 * ルートを追加したらここに 1 行足す。
 * 動的な /blog/[slug] は別途 Markdown から自動列挙するためここには含めない。
 */
export const STATIC_ROUTES = ['/', '/about', '/blog', '/contact'] as const;
