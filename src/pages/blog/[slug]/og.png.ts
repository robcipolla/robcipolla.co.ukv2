export const prerender = true;

import { getCollection, type CollectionEntry } from "astro:content";
import { ImageResponse } from "@vercel/og";
import type { ReactElement } from "react";
import { createOGEReactElement } from "@utils/openGraphHelpers";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"blog"> };
}

export async function GET({ props }: Props) {
  const { post } = props;

  const reactElement: ReactElement = createOGEReactElement(post.data.title);

  return new ImageResponse(reactElement, {
    width: 1200,
    height: 600,
  });
}

export async function getStaticPaths() {
  const blogPosts = await getCollection("blog");

  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
