/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F1B2D',
          light: '#17263F',
          soft: '#445068'
        },
        paper: {
          DEFAULT: '#FAF9F6',
          dim: '#F1EFE9'
        },
        brass: {
          DEFAULT: '#B8905A',
          dark: '#96713F',
          light: '#D7B784'
        },
        forecast: '#2F6B4F',
        rust: '#A6432E'
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.03em'
      },
      backgroundImage: {
        seal: "radial-gradient(circle at center, rgba(184,144,90,0.14) 0%, rgba(184,144,90,0) 70%)"
      }
    }
  },
  plugins: []
}
