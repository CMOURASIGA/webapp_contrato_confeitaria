/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Yuri Velloso (Híbrida para adaptar ao código existente)
        brand: {
          50: '#fffcf5', // Fundo Creme Bem Claro (Círculo do logo)
          100: '#f9f1e0',
          200: '#decab0', // Taupe/Bege (Bordas suaves)
          300: '#c2a689', // Cor "Velloso"
          400: '#ef5350', // Vermelho claro (Hover/Focus)
          500: '#e53935', // Vermelho Coral Vibrante
          600: '#d32f2f', // VERMELHO "Yuri" (Cor Principal dos Botões)
          700: '#8d6e63', // Marrom médio
          800: '#5d4037', // Marrom Chocolate (Textos e Faixa)
          900: '#3e2723', // Marrom Café (Texto escuro)
          950: '#281815',
        },
        // Detalhes em Dourado/Âmbar (Camadas do bolo)
        accent: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28', // Dourado do bolo
          500: '#ffc107',
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
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