/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        cream: '#f0efe9',
        dark: '#1a1a1a',
        accent: 'var(--accent)',
      },
      backgroundImage: {
        'topo': "url('topo.svg')",
      }
    },
  },
  plugins: [],
}
