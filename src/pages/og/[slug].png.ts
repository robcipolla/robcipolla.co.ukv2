export const prerender = true;

import { createOGEReactElement } from "@utils/openGraphHelpers";
import { ImageResponse } from "@vercel/og";
import type { ReactElement } from "react";

export async function GET() {
  const reactElement: ReactElement = createOGEReactElement("", false);

  return new ImageResponse(reactElement, {
    width: 1200,
    height: 600,
  });
}

export async function getStaticPaths() {
  return [
    {
      params: { slug: "home" },
    },
    {
      params: { slug: "about" },
    },
    {
      params: { slug: "blog" },
    },
    {
      params: { slug: "contact" },
    },
  ];
}
