import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0a0a0a',
          card: '#111111',
          elevated: '#161616',
        },
        neutral: {
          950: '#0a0a0a',
        }
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.08)',
        default: 'rgba(255,255,255,0.12)',
        strong: 'rgba(255,255,255,0.20)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
