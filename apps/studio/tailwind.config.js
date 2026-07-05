/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        studio: {
          background: "#F8F5FF",
          surface: "#FFFFFF",
          mint: "#FFF7FC",
          sidebar: "#F5F2FF",
          primary: "#6C63FF",
          primaryStrong: "#20184F",
          primarySoft: "#EDEBFF",
          action: "#FF6B86",
          actionStrong: "#F5577A",
          actionSoft: "#FFE8EF",
          actionStart: "#6C63FF",
          actionEnd: "#D85AD8",
          info: "#5B6CFF",
          text: "#20184F",
          muted: "#68708A",
          border: "#E5E0F5",
          borderSoft: "#F2EEFB",
        },
      },
      boxShadow: {
        studio: "0 18px 42px rgba(108, 99, 255, 0.12)",
      },
    },
  },
  plugins: [],
};
