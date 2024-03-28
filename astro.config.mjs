import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkToc from "remark-toc";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://www.robcipolla.co.uk",
  markdown: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
  },
  integrations: [tailwind(), partytown(), sitemap(), mdx(), react()],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
