/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-main': 'var(--bg-main)',
        'bg-card': 'var(--bg-card)',
        'bg-sidebar': 'var(--bg-sidebar)',
        'bg-hover': 'var(--bg-hover)',
        'border-color': 'var(--border-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-purple': 'var(--accent-purple)',
        'accent-purple-light': 'var(--accent-purple-light)',
        'accent-purple-glow': 'var(--accent-purple-glow)',
        'status-available': 'var(--status-available)',
        'status-occupied': 'var(--status-occupied)',
        'status-icu': 'var(--status-icu)',
        'emergency-red': 'var(--emergency-red)',
        'emergency-red-glow': 'var(--emergency-red-glow)',
        'emergency-bg': 'var(--emergency-bg)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
