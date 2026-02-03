import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
                        "primary": "#1337ec",
                        "background-light": "#f6f6f8",
                        "background-dark": "#101322",
        },
    },
  },
  plugins: [animate],
}