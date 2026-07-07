/**
 * sitemap の XML 文字列を組み立てる純粋関数群。
 * I/O やフレームワークに依存しない（テスト・再利用しやすいように分離）。
 */

export interface SitemapEntry {
  /** ページの絶対 URL */
  loc: string;
  /** 最終更新日（YYYY-MM-DD などの W3C Datetime）。任意。 */
  lastmod?: string;
}

/**
 * XML の特殊文字をエスケープする
 * @param value エスケープ対象の文字列
 * @returns エスケープ済み文字列
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * ページ一覧の sitemap（<urlset>）を生成する
 * @param entries sitemap エントリ配列
 * @returns urlset 形式の XML 文字列
 */
export function renderUrlset(entries: SitemapEntry[]): string {
  const urls = entries
    .map(({loc, lastmod}) => {
      const lastmodTag = lastmod
        ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
        : '';
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmodTag}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * 複数の sitemap を束ねる sitemap index（<sitemapindex>）を生成する
 * @param sitemapUrls 束ねる sitemap の絶対 URL 配列
 * @returns sitemapindex 形式の XML 文字列
 */
export function renderSitemapIndex(sitemapUrls: readonly string[]): string {
  const sitemaps = sitemapUrls
    .map((loc) => `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}
