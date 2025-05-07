import { ui, defaultLang } from './ui';
import { getEquivalentBlogSlug } from './blogMappings';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

/**
 * Checks if the current URL is a blog post and returns the slug if it is
 * @param url The current URL
 * @returns The blog post slug or null if not a blog post
 */
function getBlogSlugFromUrl(url: URL): string | null {
  const pathParts = url.pathname.split('/');
  
  // Check if this is a blog post URL (e.g., /fi/blog/something or /en/blog/something)
  if (pathParts.length >= 4 && pathParts[2] === 'blog') {
    return pathParts[3]; // Return the slug
  }
  
  return null;
}

export function getRelativeLocaleUrl(lang: keyof typeof ui, path?: string) {
  // If it's the root path and default language, return just "/"
  if (lang === defaultLang && (!path || path === '/')) {
    return '/';
  }
  
  return `/${lang}${path || ''}`;
}

/**
 * Gets the correct URL for language switching, handling blog posts specially
 * @param currentUrl The current URL
 * @param targetLang The language to switch to
 * @returns The URL in the target language
 */
export function getLanguageSwitchUrl(currentUrl: URL, targetLang: keyof typeof ui): string {
  const currentLang = getLangFromUrl(currentUrl);
  
  // If not changing language, return current URL
  if (currentLang === targetLang) {
    return currentUrl.pathname;
  }
  
  // Check if we're on a blog post
  const blogSlug = getBlogSlugFromUrl(currentUrl);
  if (blogSlug) {
    // Try to find equivalent blog post in target language
    const targetSlug = getEquivalentBlogSlug(blogSlug, currentLang, targetLang);
    if (targetSlug) {
      // Return URL to equivalent blog post
      return `/${targetLang}/blog/${targetSlug}`;
    }
    // If no equivalent found, fall back to blog index
    return `/${targetLang}/blog`;
  }
  
  // For non-blog pages, remove current language prefix and add target language
  let pathWithoutLocale = currentUrl.pathname;
  if (pathWithoutLocale.startsWith(`/${currentLang}`)) {
    pathWithoutLocale = pathWithoutLocale.substring(`/${currentLang}`.length);
  }
  if (pathWithoutLocale === '') {
    pathWithoutLocale = '/';
  }
  
  return getRelativeLocaleUrl(targetLang, pathWithoutLocale);
} 