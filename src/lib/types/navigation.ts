export interface NavigationItem {
  href: string;
  label: string;
  isActive?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  currentPath?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}
