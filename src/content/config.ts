import { defineCollection, z } from 'astro:content';

// Define the schema for the blog collection
const blogCollection = defineCollection({
  type: 'content', // 'content' for Markdown/MDX files
  schema: ({ image }) => z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blogCollection,
}; 