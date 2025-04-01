import { defineCollection, z } from 'astro:content';

// Define the schema for the blog collection
const blogCollection = defineCollection({
  type: 'content', // 'content' for Markdown/MDX files
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(), // Astro handles ISO string conversion to Date object
    description: z.string().optional(), // SEO description
    seoTitle: z.string().optional(), // Optional SEO title if different from main title
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    heroImage: image().optional(), // Use image() helper for optimization; path is relative to the MD file
    heroImageAlt: z.string().optional(), // Alt text for hero image
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blogCollection,
}; 