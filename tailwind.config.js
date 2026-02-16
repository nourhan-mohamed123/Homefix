/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'homefix-primary': '#1E3A8A',
        'homefix-accent': '#3B82F6',
        'homefix-bg': '#F8F9FA',
        'homefix-secondary': '#FAF9F6',
        'homefix-text': '#111827',
        'homefix-success': '#10B981',
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(30, 58, 138, 0.15)',
      },
      borderRadius: {
        'homepro': '1.5rem',
      }
    },
  },
  plugins: [],
}