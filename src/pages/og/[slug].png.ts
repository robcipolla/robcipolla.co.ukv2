export const prerender = true;

import { createOGEReactElement } from "@utils/openGraphHelpers";
import { ImageResponse } from "@vercel/og";
import type { ReactElement } from "react";

interface Props {
  params: { slug: string };
  props: { title: string };
}

export async function GET({ props }: Props) {
  const { title } = props;

  const reactElement: ReactElement = createOGEReactElement(title);

  return new ImageResponse(reactElement, {
    width: 1200,
    height: 600,
  });
}

export async function getStaticPaths() {
  return [
    {
      params: { slug: "home" },
      props: {
        title: "Home",
      },
    },
    {
      params: { slug: "about" },
      props: {
        title: "About",
      },
    },
    {
      params: { slug: "blog" },
      props: {
        title: "Blog",
      },
    },
    {
      params: { slug: "contact" },
      props: {
        title: "Contact",
      },
    },
  ];
}
