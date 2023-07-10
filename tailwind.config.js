/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#042B41",
        green: "#79BD9A",
        darkBlue: "#042B41",
        card: "#0B486B",
        yellow: "#CFF09E"
      },
    },
  },
  plugins: [],
};
