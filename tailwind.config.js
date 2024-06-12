/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Sora", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        partnerInfoBg: "linear-gradient(129deg, #220F41 1.09%, #19193D 98.84%)", // TODO: To rework
        partnerMissionCardBg:
          "linear-gradient(180deg, #733BD6 0.5%, rgba(115, 59, 214, 0.00) 100%)", // TODO: To rework
        pointBg:
          "linear-gradient(0deg, rgba(138, 98, 237, 0.20) 0%, rgba(138, 98, 237, 0.20) 100%, #19193D)", // TODO: To rework
      },
      colors: {
        "white": "hsl(var(--white))",
        "black": "hsl(var(--black))",
        "translucent": "rgba(17, 17, 17, 0.01)",
        "transparent": {
          DEFAULT: "hsla(var(--white) / 0)",
          3: "hsla(var(--white) / 0.03)",
          5: "hsla(var(--white) / 0.05)",
          6: "hsla(var(--white) / 0.06)",
          8: "hsla(var(--white) / 0.08)",
          10: "hsla(var(--white) / 0.10)",
          12: "hsla(var(--white) / 0.12)",
          15: "hsla(var(--white) / 0.15)",
          20: "hsla(var(--white) / 0.2)",
          30: "hsla(var(--white) / 0.3)",
        },
        "background": {
          "DEFAULT": "hsl(var(--background))",
          "light": "hsl(var(--background-light))",
          "extra-light": "hsl(var(--background-extra-light))",
        },
        "foreground": "hsl(var(--foreground))",
        "muted": {
          DEFAULT: "hsla(var(--background) / 0.2)",
          foreground: "hsla(var(--foreground) / 0.7)",
        },
        "primary": {
          "DEFAULT": "hsl(var(--primary))",
          "background": "hsla(var(--primary) / 0.2)",
          "background-hover": "hsl(var(--primary-bg-hover))",
          "background-disabled": "hsl(var(--primary-bg-disabled))",
          "foreground": "hsl(var(--background))",
        },
        "success": {
          DEFAULT: "hsl(var(--success))",
          background: "hsla(var(--success) / 0.2)",
        },
        "warning": {
          DEFAULT: "hsl(var(--warning))",
          background: "hsla(var(--warning) / 0.2)",
        },
        "error": {
          DEFAULT: "hsl(var(--error))",
          background: "hsla(var(--error) / 0.2)",
        },
        "pending": {
          DEFAULT: "hsl(var(--pending))",
          background: "hsla(var(--pending) / 0.2)",
        },
        "gray": {
          DEFAULT: "hsl(var(--gray))",
        },
        "border": {
          DEFAULT: "hsla(var(--white) / 0.15)",
          30: "hsla(var(--white) / 0.3)",
          60: "hsla(var(--white) / 0.6)",
          component: "#a683ff99", // TODO: To rework
        },
        "divider": {
          DEFAULT: "hsla(var(--white) / 0.15)",
        },
        "notification": {
          DEFAULT: "hsl(var(--notification) / 0.8)",
          foreground: "hsl(var(--foreground))",
        },
        "menu": {
          DEFAULT: "hsla(var(--menu) / 0.8)",
          foreground: "hsl(var(--foreground))",
        },
        "topBanner": {
          DEFAULT: "hsl(var(--banner-grad-1))",
          grad1: "hsl(var(--banner-grad-1))",
          grad2: "hsl(var(--banner-grad-2))",
          foreground: "hsl(var(--foreground))",
        },
        "partner-info-primary": "#733BD6", // TODO: To rework
        "link-color": "#A683FF", // TODO: To rework
        "partnerMissionContentBg": "rgba(36, 32, 81, 0.80)", // TODO: To rework
        "partnerMissionInfoContentBg": "rgba(25, 25, 61, 0.88)", // TODO: To rework
        "partnerMissionInfoButtonColor": "#19193D", // TODO: To rework
      },
      fontSize: {
        "heading-l": [
          "2.25rem",
          {
            lineHeight: "120%",
            fontWeight: "700",
          },
        ],
        "heading-m": [
          "1.375rem",
          {
            lineHeight: "120%",
            fontWeight: "700",
          },
        ],
        "heading-s": [
          "1.125rem",
          {
            lineHeight: "120%",
            fontWeight: "600",
          },
        ],
        "base": [
          "0.875rem",
          {
            lineHeight: "140%",
            fontWeight: "400",
          },
        ],
        "base-s": [
          "0.75rem",
          {
            lineHeight: "140%",
            fontWeight: "400",
          },
        ],
        "subtitle": [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "600",
          },
        ],
        "desktop-heading-l": [
          "3rem",
          {
            lineHeight: "120%",
            fontWeight: "700",
          },
        ],
        "desktop-heading-m": [
          "1.75rem",
          {
            lineHeight: "120%",
            fontWeight: "700",
          },
        ],
        "desktop-heading-s": [
          "1.25rem",
          {
            lineHeight: "120%",
            fontWeight: "600",
          },
        ],
        "desktop-base": [
          "1rem",
          {
            lineHeight: "140%",
            fontWeight: "400",
          },
        ],
        "desktop-base-s": [
          "0.875rem",
          {
            lineHeight: "140%",
            fontWeight: "400",
          },
        ],
        "mission-title": [
          // TODO: To rework
          "1.25rem",
          {
            lineHeight: "140%",
            fontWeight: "700",
          },
        ],
        "point-title": [
          // TODO: To rework
          "18px",
          {
            lineHeight: "140%",
            fontWeight: "800",
          },
        ],
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
      screens: {
        sm: "696px",
        xl: "1264px",
      },
      spacing: {
        4.5: "1.125rem",
      },
      backdropBlur: {
        "xs": "3px",
        "sm": "4.5px",
        "4xl": "100px",
      },
      lineHeight: {
        3.5: "0.875rem",
      },
      borderRadius: {
        10: "2.5rem",
        badge: "53px",
      },
      padding: {
        0.25: "1px",
      },
      maxWidth: {
        "partners-default": "500px", // TODO: To rework
        "partners-lg": "1000px", // TODO: To rework
        "partners-xl": "1216px", // TODO: To rework
        "partner-info-card": "384px", // TODO: To rework
      },
      width: {
        30: "120px",
      },
      boxShadow: {
        "partner-mission": "16px 32px 80px 0px #0F0F25", // TODO: To rework
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
