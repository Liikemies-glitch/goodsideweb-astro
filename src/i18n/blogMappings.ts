// This file maps blog posts between languages
// Format: key is the slug in one language, value is the matching slug in another language

export const blogMappings: Record<string, string> = {
  // Finnish to English
  'kayttoliittymasuunnittelu-ja-hyva-ux': 'user-interface-design-and-great-ux',
  'kayttoliittymasuunnittelu-osana-kasvua': 'ui-design-as-a-growth-driver',
  'kaytettavyys-muista-ainakin-nama': 'usability-checklist-five-critical-factors',
  'kayttokokemus-ei-ole-arvailua-uxr': 'user-experience-is-research-not-guesswork',
  'mista-muodostuu-hyva-kayttokokemus-10-tekijaa': 'what-makes-a-great-user-experience-10-factors',
  'mita-on-palvelumuotoilu': 'what-is-service-design',
  'kaytettavyys-ja-hakukoneoptimointi': 'usability-and-search-engine-optimization',
  'designops-muotoiluosaamisen-kumppani': 'design-ops',

  // English to Finnish (reversed mappings for convenience)
  'user-interface-design-and-great-ux': 'kayttoliittymasuunnittelu-ja-hyva-ux',
  'ui-design-as-a-growth-driver': 'kayttoliittymasuunnittelu-osana-kasvua',
  'usability-checklist-five-critical-factors': 'kaytettavyys-muista-ainakin-nama',
  'user-experience-is-research-not-guesswork': 'kayttokokemus-ei-ole-arvailua-uxr',
  'what-makes-a-great-user-experience-10-factors': 'mista-muodostuu-hyva-kayttokokemus-10-tekijaa',
  'what-is-service-design': 'mita-on-palvelumuotoilu',
  'usability-and-search-engine-optimization': 'kaytettavyys-ja-hakukoneoptimointi',
  'design-ops': 'designops-muotoiluosaamisen-kumppani',
};

/**
 * Get the equivalent blog post slug in the target language
 * @param currentSlug The current blog post slug
 * @param currentLocale The current locale
 * @param targetLocale The target locale to switch to
 * @returns The equivalent slug in the target language or null if not found
 */
export function getEquivalentBlogSlug(
  currentSlug: string,
  currentLocale: string,
  targetLocale: string
): string | null {
  // If we're not changing language or not on a blog post, return null
  if (currentLocale === targetLocale) return null;

  // Check if we have a mapping for this slug
  if (currentSlug in blogMappings) {
    return blogMappings[currentSlug];
  }

  // No mapping found
  return null;
} 