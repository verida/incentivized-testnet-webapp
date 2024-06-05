/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Sora", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        customGradient:
          "linear-gradient(138deg, rgba(255, 255, 255, .9), rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, .9))",
        reverseCustomGradient:
          "linear-gradient(138deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.1))",
        partnerInfoBg: "linear-gradient(129deg, #220F41 1.09%, #19193D 98.84%)",
        partnerMissionCardBg:
          "linear-gradient(180deg, #733BD6 0.5%, rgba(115, 59, 214, 0.00) 100%)",
      },
      colors: {
        "white": "hsl(var(--white))",
        "black": "hsl(var(--black))",
        "translucent": "rgba(17, 17, 17, 0.01)",
        "transparent": {
          DEFAULT: "hsla(var(--white) / 0)",
          3: "hsla(var(--white) / 0.03)",
          5: "hsla(var(--white) / 0.05)",
          10: "hsla(var(--white) / 0.10)",
          15: "hsla(var(--white) / 0.15)",
          20: "hsla(var(--white) / 0.2)",
          30: "hsla(var(--white) / 0.3)",
        },

        "background": "hsl(var(--background))",
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
          component: "#a683ff99",
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
        "backButtonBackground": {
          DEFAULT: "rgba(255,255,255,0.08)",
        },
        "partnerListItemBackgroundColor": {
          DEFAULT: "#242250", // design
          HOVER: "#312F5B", // design
        },
        "partner-info-primary": "#733BD6",
        "link-color": "#A683FF",
        "partnerMissionContentBg": "rgba(36, 32, 81, 0.80)",
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
          "1.25rem",
          {
            lineHeight: "140%",
            fontWeight: "700",
          },
        ],
        "point-title": [
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
      },
      padding: {
        0.25: "1px",
        backButton: "10px",
      },
      maxWidth: {
        "partners-default": "500px",
        "partners-lg": "1000px",
        "partners-xl": "1216px",
        "partner-info-card": "384px",
        "partner-page-xl": "1219px",
      },
      minWidth: {
        "partner-info": "327px",
      },
      width: {
        30: "120px",
      },
      boxShadow: {
        "partner-mission": "16px 32px 80px 0px #0F0F25",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
