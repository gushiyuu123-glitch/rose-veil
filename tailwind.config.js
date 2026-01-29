/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  /* ===========================================
     追加：動的カラーの purge 防止（重要）
  =========================================== */
  safelist: [
    "text-[#c9c4ef]",
    "text-[#efa9bd]",
    "text-[#aecdff]",
  ],

  theme: {
    extend: {

      /* ==========================================================
         COLORS — Rose Veil High-End Palette（最終版）
      ========================================================== */
      colors: {
        crimson: {
          hairline: "rgba(197,49,69,0.14)",
          glow:     "rgba(197,49,69,0.22)",
          light:    "#C53145",
          DEFAULT:  "#8C0F25",
          dark:     "#5A0510",
        },
        sapphire: {
          hairline: "rgba(47,101,177,0.14)",
          glow:     "rgba(47,101,177,0.20)",
          light:    "#2F65B1",
          DEFAULT:  "#124C8F",
          dark:     "#0A1C3A",
        },
        veilwhite: {
          glow:   "rgba(250,248,246,0.40)",
          light:  "#F4F2EF",
          DEFAULT:"#FAF8F6",
          dark:   "#E8E6E3",
        },
        gold: {
          glow:  "rgba(232,223,210,0.18)",
          thin:  "#E8DFD2",
          soft:  "#D7C8B8",
          label: "#CFC6BA",
          deep:  "#B8AFA3",
        },

        smoke:   "rgba(0,0,0,0.55)",
        smokeMd: "rgba(0,0,0,0.38)",
        smokeLt: "rgba(0,0,0,0.18)",
      },

      /* ==========================================================
         FONTS — 英字 × 日本語
      ========================================================== */
      fontFamily: {
        eng: ["'Cormorant Garamond'", "serif"],
        sub: ["'Spectral'", "serif"],
        jp: ["'Pretendard'", "sans-serif"],
      },

      /* ==========================================================
         LETTER SPACING — 高級感の源
      ========================================================== */
      letterSpacing: {
        eng:    "0.12em",
        label:  "0.18em",
        jp:     "0.06em",
        wide:   "0.24em",
      },

      opacity: {
        12: "0.12",
        15: "0.15",
        85: "0.85",
        92: "0.92",
      },

      blur: {
        xs: "1px",
        sm: "3px",
        md: "6px",
        lg: "12px",
        xl: "18px",
      },

      spacing: {
        hero: "62vh",
        lux: "3.8rem",
      },

      dropShadow: {
        gold:     "0 6px 14px rgba(232,223,210,0.22)",
        goldSoft: "0 4px 10px rgba(232,223,210,0.12)",
        crimson:  "0 6px 12px rgba(197,49,69,0.25)",
        sapphire: "0 6px 12px rgba(47,101,177,0.25)",
      },

      transitionTimingFunction: {
        luxury: "cubic-bezier(0.33, 0.04, 0.25, 1)",
        soft:   "cubic-bezier(0.25,0.10,0.25,1)",
      },
    },
  },
  plugins: [],
};
