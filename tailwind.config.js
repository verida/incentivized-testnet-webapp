/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Sora", "sans-serif"],
    },
    extend: {
      colors: {
        white: "hsl(var(--white))",
        black: "hsl(var(--black))",
        translucent: "rgba(17, 17, 17, 0.01)",
        transparent: {
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
          40: "hsla(var(--white) / 0.4)",
          50: "hsla(var(--white) / 0.5)",
          60: "hsla(var(--white) / 0.6)",
          70: "hsla(var(--white) / 0.7)",
          80: "hsla(var(--white) / 0.8)",
          90: "hsla(var(--white) / 0.9)",
          95: "hsla(var(--white) / 0.95)",
        },
        background: {
          "DEFAULT": "hsl(var(--background))",
          "light": "hsl(var(--background-light))",
          "extra-light": "hsl(var(--background-extra-light))",
        },
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsla(var(--background) / 0.2)",
          foreground: "hsla(var(--foreground) / 0.7)",
        },
        primary: {
          "DEFAULT": "hsl(var(--primary))",
          "background": "hsla(var(--primary) / 0.2)",
          "background-hover": "hsl(var(--primary-bg-hover))",
          "background-disabled": "hsl(var(--primary-bg-disabled))",
          "foreground": "hsl(var(--background))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          background: "hsla(var(--secondary) / 0.2)",
          foreground: "hsl(var(--background))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          background: "hsla(var(--success) / 0.2)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          background: "hsla(var(--warning) / 0.2)",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          background: "hsla(var(--error) / 0.2)",
        },
        pending: {
          DEFAULT: "hsl(var(--pending))",
          background: "hsla(var(--pending) / 0.2)",
        },
        ended: {
          DEFAULT: "hsl(var(--error))",
          background: "hsla(var(--white) / 0.1)",
        },
        gray: {
          DEFAULT: "hsl(var(--gray))",
        },
        border: {
          DEFAULT: "hsla(var(--white) / 0.15)",
          hover: "hsla(var(--white) / 0.3)",
        },
        divider: {
          DEFAULT: "hsla(var(--white) / 0.15)",
        },
        notification: {
          DEFAULT: "hsl(var(--notification) / 0.8)",
          foreground: "hsl(var(--foreground))",
        },
        menu: {
          DEFAULT: "hsla(var(--menu) / 0.8)",
          foreground: "hsl(var(--foreground))",
        },
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
        "heading-xs": [
          "0.875rem",
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
        "desktop-heading-xs": [
          "1rem",
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
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
      screens: {
        sm: "696px",
        xl: "1264px",
      },
      containers: {
        "2xs": "16rem",
        "3xs": "14rem",
        "4xs": "12rem",
        "5xs": "8rem",
        "6xs": "4rem",
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
      listStyleType: {
        square: "square",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      padding: {
        0.25: "1px",
      },
      width: {
        30: "120px",
        50: "200px",
      },
      height: {
        50: "200px",
      },
      boxShadow: {
        "3xl": "16px 32px 80px 0px hsla(var(--shadow) / 0.15)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
  ],
};
