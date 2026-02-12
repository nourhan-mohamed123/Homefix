/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'homefix-primary': '#1E3A8A', // Dark Blue
        'homefix-accent': '#3B82F6', // Sky Blue
        'homefix-bg': '#FFFFFF', // White
        'homefix-secondary': '#F3F4F6', // Light Gray
        'homefix-text': '#111827', // Dark Gray / Black
        'homefix-success': '#10B981', // Green
        'homefix-alert': '#EF4444', // Red
      },
    },
  },
  plugins: [],
}
