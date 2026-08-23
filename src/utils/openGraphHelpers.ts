import type { ReactElement } from "react";

const COLORS = {
  charcoal: "#292930",
  white: "#FFFFFF",
  muted: "#B7B7C0",
};

const LOGO_PATH_1 =
  "M0 17.6878V0.000267404H8.17592C9.00907 -0.0079861 9.8329 0.174923 10.5832 0.534748C11.2977 0.876355 11.9402 1.34976 12.4767 1.92974C13.0067 2.50677 13.4281 3.17371 13.7207 3.89877C14.0152 4.60596 14.1686 5.3633 14.1721 6.12862C14.1794 7.12764 13.9472 8.11404 13.4947 9.00626C13.0586 9.87667 12.4114 10.6257 11.6115 11.1859L13.132 13.2249L25.7691 5.28361L9.7277 17.0817L6.72152 12.257H4.8921V17.6878H0ZM4.89048 8.02175H7.97522C8.14477 8.01007 8.30916 7.95889 8.45509 7.87235C8.60101 7.7858 8.72436 7.66633 8.81514 7.52361C9.09715 7.11444 9.23384 6.62359 9.20362 6.12862C9.23917 5.61936 9.07771 5.11582 8.75219 4.7208C8.64425 4.58162 8.50813 4.46647 8.35261 4.38278C8.19709 4.2991 8.02564 4.24874 7.84931 4.23496H4.88995L4.89048 8.02175Z";
const LOGO_PATH_2 =
  "M22.3749 23.5238C22.1574 24.2179 21.7 24.8134 21.0836 25.2053C20.8174 25.3757 20.5252 25.502 20.2184 25.5794C19.9316 25.6524 19.6368 25.6901 19.3408 25.6917C18.8092 25.7014 18.2849 25.568 17.8234 25.3058C17.3764 25.0456 16.9911 24.6929 16.6935 24.2716C16.3733 23.8172 16.1357 23.3107 15.9913 22.775C15.8308 22.1991 15.7506 21.604 15.753 21.0064C15.754 20.4482 15.8214 19.8921 15.9537 19.3495C16.0766 18.8172 16.2932 18.3105 16.5934 17.853C16.8786 17.4211 17.2552 17.0563 17.697 16.784C18.1779 16.4999 18.7303 16.3573 19.2897 16.373C19.5849 16.3762 19.8789 16.4095 20.1672 16.4724C20.4853 16.5394 20.7902 16.6572 21.0701 16.8214C21.3693 17.0005 21.6363 17.2279 21.86 17.4943C22.1224 17.811 22.3232 18.1735 22.4519 18.5633L26.1887 15.9224C25.6102 14.7494 24.6936 13.7738 23.5555 13.1196C22.2919 12.3939 20.8516 12.0276 19.3924 12.0608C19.2213 12.0608 19.0526 12.0649 18.8861 12.0731C18.5479 12.09 18.2109 12.1257 17.8767 12.18L17.8541 12.1966L1.2327 24.4196L11.2203 18.0914C10.9351 18.9858 10.7899 19.9185 10.7898 20.8568C10.792 21.9982 11.0044 23.1297 11.4167 24.1951C11.8208 25.2684 12.4106 26.2632 13.1595 27.1348C13.9019 27.9975 14.8099 28.7046 15.8304 29.215C16.8881 29.7431 18.0576 30.0121 19.2412 29.9996C20.7201 29.9879 22.1742 29.6212 23.4796 28.9306C24.1228 28.5883 24.7103 28.1515 25.2224 27.635C25.7204 27.1386 26.1091 26.5447 26.3636 25.891L22.3749 23.5238Z";

const fontCache = new Map<string, ArrayBuffer>();

export async function loadGoogleFont(
  family: string,
  italic = false,
  weight = 400,
): Promise<ArrayBuffer> {
  const cacheKey = `${family}:${italic ? "italic" : "normal"}:${weight}`;
  if (fontCache.has(cacheKey)) return fontCache.get(cacheKey)!;

  const variant = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${variant}&display=swap`;
  const css = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((response) => response.text());

  const match = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype|woff)'\)/,
  );
  if (!match?.[1]) throw new Error(`Could not extract font URL for ${family}`);

  const data = await fetch(match[1]).then((response) => response.arrayBuffer());
  fontCache.set(cacheKey, data);
  return data;
}

export const createOGEReactElement = (
  title: string,
  label = "Rob Cipolla",
): ReactElement => {
  const displayTitle = title || "Product Engineer, noun";
  const titleFontSize =
    displayTitle.length > 70 ? 46 : displayTitle.length > 50 ? 56 : 72;

  return {
    type: "div",
    key: "root",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: COLORS.charcoal,
        padding: "64px 76px",
        fontFamily: '"DM Sans"',
      },
      children: [
        {
          type: "div",
          key: "brand",
          props: {
            style: { display: "flex", alignItems: "center", gap: 18 },
            children: [
              {
                type: "svg",
                key: "logo",
                props: {
                  width: 34,
                  height: 38,
                  viewBox: "0 0 27 30",
                  style: { display: "flex" },
                  children: [
                    {
                      type: "path",
                      key: "p1",
                      props: { d: LOGO_PATH_1, fill: COLORS.white },
                    },
                    {
                      type: "path",
                      key: "p2",
                      props: { d: LOGO_PATH_2, fill: COLORS.white },
                    },
                  ],
                },
              },
              {
                type: "div",
                key: "name",
                props: {
                  style: { color: COLORS.muted, fontSize: 20, fontWeight: 400 },
                  children: "Rob Cipolla",
                },
              },
            ],
          },
        },
        {
          type: "div",
          key: "title",
          props: {
            style: {
              color: COLORS.white,
              fontSize: titleFontSize,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.03,
              maxWidth: 1040,
            },
            children: displayTitle,
          },
        },
        {
          type: "div",
          key: "footer",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              color: COLORS.muted,
              fontSize: 18,
            },
            children: [
              { type: "div", key: "label", props: { children: label } },
              {
                type: "div",
                key: "domain",
                props: { children: "robcipolla.co.uk" },
              },
            ],
          },
        },
      ],
    },
  };
};
