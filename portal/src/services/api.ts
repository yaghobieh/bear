/**
 * Ember CMS API Client
 * Centralized API service for fetching content from Ember CMS
 */

// API Configuration - Update these for production
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_EMBER_API_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
};

// Generic request options
interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

// API Response wrapper
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Core API client with error handling and type safety
 */
class EmberAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { params, body, ...fetchOptions } = options;

    try {
      const response = await fetch(this.buildUrl(endpoint, params), {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        return {
          data: null,
          error: errorData.error || `HTTP ${response.status}`,
          status: response.status,
        };
      }

      if (response.status === 204) {
        return { data: null, error: null, status: 204 };
      }

      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      };
    }
  }

  // GET request
  get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  // POST request
  post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }
}

// Singleton instance
export const api = new EmberAPI(API_CONFIG.baseUrl);

// ============================================
// Content Types from Ember CMS
// ============================================

export interface PageContent {
  language: string;
  title: string;
  description?: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Page {
  id: string;
  slug: string;
  contents: PageContent[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  template?: string;
  featuredImage?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export interface Theme {
  id: string;
  name: string;
  isActive: boolean;
  isDark: boolean;
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteLogo?: string;
  favicon?: string;
  defaultLanguage: string;
  supportedLanguages: string[];
}

// ============================================
// CMS Service Functions
// ============================================

/**
 * Fetch published pages
 */
export async function getPages(language?: string): Promise<Page[]> {
  const { data, error } = await api.get<Page[]>('/pages', { 
    status: 'published',
    language 
  });
  
  if (error) {
    console.error('Failed to fetch pages:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string, language?: string): Promise<Page | null> {
  const { data, error } = await api.get<Page>(`/pages/slug/${slug}`, { language });
  
  if (error) {
    console.error(`Failed to fetch page ${slug}:`, error);
    return null;
  }
  
  return data;
}

/**
 * Fetch active theme
 */
export async function getActiveTheme(): Promise<Theme | null> {
  const { data, error } = await api.get<Theme>('/themes/active');
  
  if (error) {
    console.error('Failed to fetch theme:', error);
    return null;
  }
  
  return data;
}

/**
 * Fetch site configuration (public)
 */
export async function getSiteConfig(): Promise<SiteConfig | null> {
  const { data, error } = await api.get<SiteConfig>('/config/public');
  
  if (error) {
    console.error('Failed to fetch config:', error);
    return null;
  }
  
  return data;
}

/**
 * Fetch translatable content by namespace
 */
export async function getContent(namespace: string, language?: string): Promise<Record<string, string>> {
  const { data, error } = await api.get<Record<string, string>>(`/content/namespace/${namespace}`, { language });
  
  if (error) {
    console.error(`Failed to fetch content ${namespace}:`, error);
    return {};
  }
  
  return data || {};
}

// ============================================
// React Hooks for CMS Data
// ============================================

import { useState, useEffect } from 'react';

/**
 * Hook to fetch and cache CMS content
 */
export function useContent(namespace: string, language = 'en') {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchContent = async () => {
      setIsLoading(true);
      const data = await getContent(namespace, language);
      
      if (mounted) {
        setContent(data);
        setIsLoading(false);
      }
    };

    fetchContent().catch((err) => {
      if (mounted) {
        setError(err.message);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [namespace, language]);

  // Helper to get a specific key with fallback
  const t = (key: string, fallback?: string): string => {
    return content[key] || fallback || key;
  };

  return { content, t, isLoading, error };
}

/**
 * Hook to fetch page data
 */
export function usePage(slug: string, language = 'en') {
  const [page, setPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPage = async () => {
      setIsLoading(true);
      const data = await getPageBySlug(slug, language);
      
      if (mounted) {
        setPage(data);
        setIsLoading(false);
      }
    };

    fetchPage().catch((err) => {
      if (mounted) {
        setError(err.message);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [slug, language]);

  // Get content for current language
  const getLocalizedContent = (): PageContent | undefined => {
    if (!page) return undefined;
    return page.contents.find((c) => c.language === language) || page.contents[0];
  };

  return { page, content: getLocalizedContent(), isLoading, error };
}

/**
 * Hook to fetch active theme
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchTheme = async () => {
      const data = await getActiveTheme();
      
      if (mounted) {
        setTheme(data);
        setIsLoading(false);
        
        // Apply theme colors as CSS variables
        if (data?.colors) {
          const root = document.documentElement;
          Object.entries(data.colors).forEach(([key, value]) => {
            root.style.setProperty(`--ember-${key}`, value);
          });
        }
      }
    };

    fetchTheme();

    return () => {
      mounted = false;
    };
  }, []);

  return { theme, isLoading };
}

