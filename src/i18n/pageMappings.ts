// This file maps pages between languages
// Format: key is the page in one language, value is the matching page in another language

export const pageMappings: Record<string, string> = {
  // Finnish to English
  'tuotepositiointi': 'product-positioning',
  // These are the same in both languages
  'services': 'services', 
  'references': 'references',
  'contact': 'contact',
  'diy-opas': 'diy-guide',

  // English to Finnish (reversed mappings for convenience)
  'product-positioning': 'tuotepositiointi',
  'diy-guide': 'diy-opas',
};

/**
 * Get the equivalent page path in the target language
 * @param currentPath The current page path (without locale prefix)
 * @param currentLocale The current locale
 * @param targetLocale The target locale to switch to
 * @returns The equivalent path in the target language or the original path if not found
 */
export function getEquivalentPagePath(
  currentPath: string,
  currentLocale: string,
  targetLocale: string
): string {
  // If we're not changing language, return original path
  if (currentLocale === targetLocale) return currentPath;

  // If path is just "/", return "/"
  if (currentPath === "/" || currentPath === "") return "/";

  // Remove leading slash if present
  const normalizedPath = currentPath.startsWith("/") 
    ? currentPath.substring(1) 
    : currentPath;

  // Check if we have a mapping for this path
  if (normalizedPath in pageMappings) {
    return pageMappings[normalizedPath];
  }

  // No mapping found, return original path
  return normalizedPath;
} 