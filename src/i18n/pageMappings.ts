// This file maps pages between languages
// Format: key is the page in one language, value is the matching page in another language

export const pageMappings: Record<string, string> = {
  // Finnish to English
  'tuotepositiointi': 'product-positioning',
  'ux-suunnittelu': 'ux-design',
  'kayttajatutkimus': 'user-research',
  'interaktiodatan-analyysi': 'interaction-data-analysis',
  'services': 'services', 
  'references': 'references',
  'contact': 'contact',
  'diy-opas': 'diy-guide',
  'ux-suunnittelija': 'saas-ux-designer',
  'design-ux-ui': 'ui-ux-design',
  'palvelumuotoilu': 'service-design',
  'kayttoliittymasuunnittelu': 'ui-design',
  'suunnittelijaroolit': 'designer-roles',

  // English to Finnish (reversed mappings for convenience)
  'product-positioning': 'tuotepositiointi',
  'ux-design': 'ux-suunnittelu',
  'user-research': 'kayttajatutkimus',
  'interaction-data-analysis': 'interaktiodatan-analyysi',
  'diy-guide': 'diy-opas',
  'saas-ux-designer': 'ux-suunnittelija',
  'ui-ux-design': 'design-ux-ui',
  'service-design': 'palvelumuotoilu',
  'ui-design': 'kayttoliittymasuunnittelu',
  'designer-roles': 'suunnittelijaroolit',
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
  let normalizedPath = currentPath.startsWith("/") 
    ? currentPath.substring(1) 
    : currentPath;

  // Remove trailing slash if present
  if (normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.substring(0, normalizedPath.length - 1);
  }

  // Check if we have a mapping for this path
  if (normalizedPath in pageMappings) {
    return pageMappings[normalizedPath];
  }

  // No mapping found, return original path (without the trailing slash, if it was removed)
  // or consider if the original currentPath (with slash) should be returned if no mapping.
  // For now, returning the slash-trimmed normalizedPath is consistent.
  return normalizedPath;
} 