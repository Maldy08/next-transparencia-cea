import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      keyframes: {
        "fade-in" : {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        "fade-out" : {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        "slide-up": {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "slide-down": {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "fade-in-scale": {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        "fade-out-scale": {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        "shimmer": {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        "pulse-glow": {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(149, 31, 67, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(149, 31, 67, 0)' },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        "spin-slow": {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      animation: {
        openmodal: 'fade-in-scale 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        closemodal: 'fade-out-scale 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-scale': 'fade-in-scale 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'shimmer': 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
      
      colors: {
        primary: {
          "50":"#fcf3f7",
          "100":"#fbe8f1",
          "200":"#f8d2e4",
          "300":"#f4adcd",
          "400":"#ec7aab",
          "500":"#e2528b",
          "600":"#d03268",
          "700":"#b42251",
          "800":"#951f43",
          "900":"#651930",
          "950":"#4b0c1f",
        },
        secondary: {
          "50":"#fdf8f0",
          "100":"#f8eed9",
          "200":"#f0d9af",
          "300":"#e5bf80",
          "400":"#d4a76a",
          "500":"#bd8c52",
          "600":"#a67339",
          "700":"#8a5d2e",
          "800":"#6f4a26",
          "900":"#5a3d22",
          "950":"#321b16",
        },
        neutral: {
          "50":"#fafaf9",
          "100":"#f3f2f0",
          "200":"#e8e6e3",
          "300":"#d5d2cd",
          "400":"#a8a29e",
          "500":"#78716c",
          "600":"#57534e",
          "700":"#44403c",
          "800":"#292524",
          "900":"#1c1917",
          "950":"#0f0e0d",
        },
      },

      boxShadow: {
        'glass': '0 8px 32px rgba(75, 12, 31, 0.08)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 6px 16px rgba(75,12,31,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 12px 28px rgba(75,12,31,0.07)',
        'elevated': '0 8px 24px rgba(0,0,0,0.12), 0 16px 48px rgba(75,12,31,0.08)',
        'glow': '0 0 20px rgba(149, 31, 67, 0.15)',
        'glow-lg': '0 0 40px rgba(149, 31, 67, 0.2)',
        'inner-subtle': 'inset 0 1px 2px rgba(0,0,0,0.06)',
      },

      fontFamily: {
        'display': ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        'body': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji'
        ],
        'sans': [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji'
        ]
      },
    },
  },
  plugins: [],
}
export default config
