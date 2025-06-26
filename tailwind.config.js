/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      colors: {
        'navy': '#0a192f',
        'light-navy': '#112240',
        'lightest-navy': '#233554',
        'slate': '#8892b0',
        'light-slate': '#a8b2d1',
        'lightest-slate': '#ccd6f6',
        'accent': '#64ffda', // Green accent
        'accent-coral': '#ff6b6b', // Coral accent for highlights
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['"SF Mono"', '"Fira Code"', '"Fira Mono"', 'Roboto Mono', 'monospace'],
      },
       transitionTimingFunction: {
        'cubic-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
