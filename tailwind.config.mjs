/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "p a": {
              color: theme("colors.accent-purple"),
              fontWeight: theme("fontWeight.semibold"),
            },
          },
        },
      }),
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgb(50,54,98), rgb(30,30,30))",
      },
      boxShadow: {
        "header-shadow": "0 16px 48px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        "primary-purple": "#9B85FF",
        "primary-teal": "#4FBDBD",
        "accent-purple": "#6E54DD",
        "off-white": "#F9F9F9",
        "raisin-black": "#2C2C34",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    function ({ addComponents, theme }) {
      addComponents({
        ".btn": {
          backgroundColor: theme("colors.accent-purple"),
          color: theme("colors.white"),
          lineHeight: theme("lineHeight.none"),
          padding: `${theme("spacing[2.5]")} ${theme("spacing.3")}`,
          borderRadius: theme("borderRadius.lg"),
          transition: theme("transition.colors"),
          "&:hover": {
            backgroundColor: theme("colors.primary-purple"),
          },
        },
      });
    },
  ],
};
