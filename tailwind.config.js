/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Restaurando a paleta "Rosa/Creme" (Doces & Sonhos original)
        brand: {
          50: '#fff1f2', // Fundo Rosado/Creme bem claro
          100: '#ffe4e6',
          200: '#fecdd3', // Bordas suaves
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48', // Cor primária (Botões, Destaques) - Rosa Intenso
          700: '#be123c',
          800: '#9f1239', // Textos principais
          900: '#881337', // Textos escuros
          950: '#4c0519',
        },
        // Mantendo um toque de dourado para alertas/estrelas, mas suave
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
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