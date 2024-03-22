import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    readingTime: z.number(),
    date: z.date(),
  }),
});

export const collections = {
  blog: blogCollection,
};
