export interface SEOAnalysis {
  url: string;
  title?: string;
  description?: string;
  keywords?: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    h5: string[];
    h6: string[];
  };
  images: {
    total: number;
    withAlt: number;
    withoutAlt: number;
    missingAlt: string[];
  };
  links: {
    internal: number;
    external: number;
    broken?: number;
  };
  performance?: {
    loadTime?: number;
    pageSize?: number;
  };
  socialMedia: {
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
  schema?: Record<string, unknown>[];
  issues: string[];
  suggestions: string[];
  score: number;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}