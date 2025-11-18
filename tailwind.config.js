/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Regina Ribas (Baseada na logo enviada)
        brand: {
          50: '#faf7f2', // Fundo Creme Suave
          100: '#f3ebe1',
          200: '#e6d6c1', // Bege claro
          300: '#d4bba0',
          400: '#c29d7c',
          500: '#ae815e',
          600: '#8d6246', // Marrom Chocolate Claro (Botões)
          700: '#714c38',
          800: '#5e3f32', // Texto Principal (Marrom Escuro)
          900: '#4d342c', // Texto Escuro
          950: '#2b1c17',
        },
        // Dourado/Laranja da flor da logo
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Dourado Principal
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}