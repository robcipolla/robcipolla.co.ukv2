import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig, fontProviders } from "astro/config";
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
  fonts: [
    {
      provider: fontProviders.google(),
      name: "DM Serif Display",
      cssVariable: "--font-dm-serif",
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
      weights: [300, 400, 500, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "DM Mono",
      cssVariable: "--font-dm-mono",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Fira Code", "monospace"],
    },
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
