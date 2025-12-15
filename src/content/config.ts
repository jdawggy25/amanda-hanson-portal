import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Basic Info
    title: z.string().optional(),
    description: z.string().optional(),

    // SEO Report Specific Fields (Optional - for template customization)
    client: z.string().optional(),
    reportDate: z.string().optional(),
    reportType: z.enum(['audit', 'monthly', 'quarterly', 'strategy', 'technical', 'content']).optional(),
    tags: z.array(z.string()).optional(),

    // Legacy support
    date: z.string().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};
