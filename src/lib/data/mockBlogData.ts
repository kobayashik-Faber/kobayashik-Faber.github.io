import type {BlogPost} from '$lib/types';

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'SvelteKit と Panda CSS でモダンなWebサイトを構築する',
    excerpt:
      'SvelteKitとPanda CSSを組み合わせて、型安全でスケーラブルなWebサイトを構築する方法について解説します。',
    date: '2024-12-16',
    url: '/blog/sveltekit-with-panda-css',
    slug: 'sveltekit-with-panda-css',
    isExternal: false,
    tags: ['SvelteKit', 'Panda CSS', 'TypeScript'],
  },
  {
    id: '2',
    title: 'フロントエンド開発における型安全性の重要性',
    excerpt:
      'TypeScriptを使ったフロントエンド開発における型安全性のメリットと実践的な活用方法について説明します。',
    date: '2024-12-15',
    url: '/blog/typescript-type-safety',
    slug: 'typescript-type-safety',
    isExternal: false,
    tags: ['TypeScript', 'Frontend', 'Development'],
  },
  {
    id: '3',
    title: 'デザインシステムの構築とメンテナンス',
    excerpt:
      '大規模なWebアプリケーションにおけるデザインシステムの構築方法と継続的なメンテナンスについて。',
    date: '2024-12-14',
    url: 'https://fabercompany-dev.hatenablog.com/entry/design-system',
    slug: 'design-system-maintenance',
    isExternal: true,
    externalUrl: 'https://fabercompany-dev.hatenablog.com/entry/design-system',
    tags: ['Design System', 'UI/UX'],
  },
  {
    id: '4',
    title: 'レスポンシブデザインのベストプラクティス',
    excerpt:
      'モダンなレスポンシブデザインの手法と、様々なデバイスに対応するためのベストプラクティス。',
    date: '2024-12-13',
    url: '/blog/responsive-design-best-practices',
    slug: 'responsive-design-best-practices',
    isExternal: false,
    tags: ['Responsive Design', 'CSS', 'Mobile'],
  },
  {
    id: '5',
    title: 'React から Svelte への移行体験記',
    excerpt:
      'Reactで開発していたプロジェクトをSvelteに移行した際の体験と学んだことをまとめました。',
    date: '2024-12-12',
    url: '/blog/react-to-svelte-migration',
    slug: 'react-to-svelte-migration',
    isExternal: false,
    tags: ['React', 'Svelte', 'Migration'],
  },
];

// Get latest posts for homepage carousel (first 5)
export const getLatestPosts = (count: number = 5): BlogPost[] => {
  return mockBlogPosts.slice(0, count);
};
