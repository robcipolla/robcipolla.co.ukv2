export const prerender = true;

import {
  createOGEReactElement,
  loadGoogleFont,
} from "@utils/openGraphHelpers";
import { ImageResponse } from "@vercel/og";
import type { ReactElement } from "react";

// Title shown as the large headline (empty = shows "Rob Cipolla")
const PAGE_TITLES: Record<string, string> = {
  home: "",
  about: "About Rob",
  blog: "Blog",
  contact: "Get in Touch",
};

// Label shown at the bottom beside the ember dash
const PAGE_LABELS: Record<string, string> = {
  home: "Software Engineer",
  about: "About",
  blog: "Writing",
  contact: "Contact",
};

export async function GET({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [fontNormal, fontItalic] = await Promise.all([
    loadGoogleFont("DM Serif Display", false),
    loadGoogleFont("DM Serif Display", true),
  ]);

  const reactElement: ReactElement = createOGEReactElement(
    PAGE_TITLES[slug] ?? "",
    PAGE_LABELS[slug] ?? "robcipolla.co.uk",
  );

  return new ImageResponse(reactElement, {
    width: 1200,
    height: 600,
    fonts: [
      { name: "DM Serif Display", data: fontNormal, style: "normal", weight: 400 },
      { name: "DM Serif Display", data: fontItalic, style: "italic", weight: 400 },
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
