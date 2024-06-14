// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // tags: z.array(z.enum(['one', 'two', 'three', 'four'])).optional(),
      image: image().optional(),
    }),
});

const articlesCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubData: z.date(),
      // tags: z.array(z.enum(['one', 'two', 'three', 'four'])).optional(),
      image: z.object({ image: image(), alt: z.string() }).optional(),
    }),
});

const contactCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    email: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      postcode: z.string(),
      country: z.string(),
    }),
    socialLinks: z.array(
      z.object({ platform: z.string(), profileLink: z.string() })
    ),
  }),
});

const seoCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      logo: image(),
      logoAlt: z.string(),
      description: z.string(),
      socialImage: image(),
      socialImageAlt: z.string(),
    }),
});

const navigatationCollection = defineCollection({
  type: 'data',
  schema: z.object({
    links: z.array(
      z.object({
        discriminant: z.string(),
        value: z.object({ title: z.string(), url: z.string() }),
      })
    ),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  articles: articlesCollection,
  contact: contactCollection,
  navigation: navigatationCollection,
  seo: seoCollection,
};
