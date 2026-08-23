export const prerender = true;

import { createOGEReactElement, loadGoogleFont } from "@utils/openGraphHelpers";
import { ImageResponse } from "@vercel/og";
import type { ReactElement } from "react";

// Title shown as the large headline (empty = shows "Rob Cipolla")
const PAGE_TITLES: Record<string, string> = {
  home: "Product Engineer, noun",
  about: "About me",
  blog: "Writing",
  contact: "Contact",
};

// Label shown at the bottom beside the ember dash
const PAGE_LABELS: Record<string, string> = {
  home: "Product engineering",
  about: "About",
  blog: "Writing",
  contact: "Contact",
};

export async function GET({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [fontNormal, fontBold] = await Promise.all([
    loadGoogleFont("DM Sans", false, 400),
    loadGoogleFont("DM Sans", false, 700),
  ]);

  const reactElement: ReactElement = createOGEReactElement(
    PAGE_TITLES[slug] ?? "",
    PAGE_LABELS[slug] ?? "robcipolla.co.uk",
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
  return [
    { params: { slug: "home" } },
    { params: { slug: "about" } },
    { params: { slug: "blog" } },
    { params: { slug: "contact" } },
  ];
}
