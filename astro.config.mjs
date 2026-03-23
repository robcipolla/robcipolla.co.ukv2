import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import remarkToc from "remark-toc";
import tailwindcss from "@tailwindcss/vite";

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
  integrations: [partytown(), sitemap(), mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
