/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        studio: {
          background: "#F8FAFC",
          surface: "#FFFFFF",
          mint: "#F6FBFA",
          sidebar: "#ECFDF5",
          primary: "#0F766E",
          primaryStrong: "#115E59",
          primarySoft: "#CCFBF1",
          action: "#0F766E",
          actionStrong: "#115E59",
          actionSoft: "#ECFDF5",
          actionStart: "#0F766E",
          actionEnd: "#22C7B8",
          info: "#2563EB",
          text: "#102033",
          muted: "#64748B",
          border: "#DBE7E8",
          borderSoft: "#EAF2F3",
        },
      },
      boxShadow: {
        studio: "0 18px 42px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
