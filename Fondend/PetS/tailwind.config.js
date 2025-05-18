import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f472b6',
        secondary: '#fcd34d',
        light: '#fff7f9',
        dark: '#1f2937',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },      
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 10px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [lineClamp],
};
