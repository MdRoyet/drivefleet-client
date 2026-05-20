/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 🌟 Overrides standard Tailwind sans classes to explicitly prioritize Poppins
      fontFamily: {
        sans: ["Poppins"],
      },
    },
  },
  plugins: [require("daisyui")],
};
