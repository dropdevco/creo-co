/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        creo: {
          dark:     '#253937', // Deep Teal Authority
          primary:  '#576E51', // Foundational Sage
          accent:   '#B25F6F', // Quiet Blush
          teal:     '#6697A6', // Clarity Blue
          light:    '#F8F9F6', // Context Cream
          muted:    '#6D7A73', // Soft Resolve
          border:   '#C0D4AF', // Balanced Sand
          green:    '#8EC499', // Warm Horizon
          burgundy: '#743A39', // Rooted Ochre
          khaki:    '#B8B781', // Golden Intent
          peach:    '#E8A87C', // Human Peach
          charcoal: '#171717', // Body Copy Charcoal
        },
      },
      fontFamily: {
        heading: ['Tomato Grotesk', 'Rubik', 'sans-serif'],
        body:    ['Tomato Grotesk', 'Rubik', 'sans-serif'],
        accent:  ['Ceraph', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease-out forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.7s ease-out forwards',
        'float':      'float 4s ease-in-out infinite',
        'ticker':     'ticker 35s linear infinite',
        'marquee':    'marquee 25s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

