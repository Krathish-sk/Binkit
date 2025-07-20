// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-200": "#ffbf00", // amber-400
        "primary-100": "#ffc929", // amber-400
        "secondary-200": "#00b050", // green-600
        "secondary-100": "#0b1a78", // blue-900
      },
    },
  },
  plugins: [],
};
