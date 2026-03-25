/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-black': '#1d1d1d',
        ink: '#23252c',
        mist: '#dddee3',
        panel: '#ffffff',
        line: '#d7d7d2',
        accent: '#7a34f3',
        accentSoft: '#efe7ff',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 18px 40px rgba(35, 37, 44, 0.07)',
      },
      borderRadius: {
        sm: '6px',
      },
    },
  },
  plugins: [],
}
