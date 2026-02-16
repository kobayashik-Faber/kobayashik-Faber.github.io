export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  url: string;
  slug?: string;
  tags?: string[];
  categories?: string[];
  category?: string;
  isExternal: boolean;
  externalUrl?: string;
  author?: string;
  source?: string;
}

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  category?: string;
}

export interface ExternalBlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author: string;
}

export interface BlogCarouselProps {
  posts: BlogPost[];
  autoPlay?: boolean;
  interval?: number;
}
