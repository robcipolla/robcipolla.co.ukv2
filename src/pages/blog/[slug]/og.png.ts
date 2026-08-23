export const prerender = true;

import { getCollection, type CollectionEntry } from "astro:content";
import { ImageResponse } from "@vercel/og";
import type { ReactElement } from "react";
import { createOGEReactElement, loadGoogleFont } from "@utils/openGraphHelpers";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"blog"> };
}

export async function GET({ props }: Props) {
  const { post } = props;

  const [fontNormal, fontBold] = await Promise.all([
    loadGoogleFont("DM Sans", false, 400),
    loadGoogleFont("DM Sans", false, 700),
  ]);

  const reactElement: ReactElement = createOGEReactElement(
    post.data.title,
    "Blog",
  );

  return new ImageResponse(reactElement, {
    width: 1200,
    height: 600,
    fonts: [
      { name: "DM Sans", data: fontNormal, style: "normal", weight: 400 },
      { name: "DM Sans", data: fontBold, style: "normal", weight: 700 },
    ],
  });
}

export async function getStaticPaths() {
  const blogPosts = await getCollection("blog");

  return blogPosts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}
