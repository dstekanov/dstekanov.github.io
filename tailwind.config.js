module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          void: '#030508',
          deep: '#08090f',
          ash: '#12141e',
          fog: '#1e2132',
          steel: '#2e3250',
          ghost: '#5a607a',
          mist: '#9199b8',
          light: '#c8cfe8',
          pulse: '#4af0c4',
          drain: '#c04af0',
          warn: '#f04a6a',
          gold: '#f0c44a',
        },
        fontFamily: {
          heading: ['Unbounded', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
          mono: ['Space Mono', 'monospace'],
        },
        animation: {
          'fade-up': 'fadeUp 0.6s ease forwards',
          'blink': 'blink 1s step-end infinite',
          'scan': 'scan 8s linear infinite',
        },
        keyframes: {
          fadeUp: {
            '0%': { opacity: '0', transform: 'translateY(24px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          blink: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0' },
          },
          scan: {
            '0%': { transform: 'translateY(-100%)' },
            '100%': { transform: 'translateY(100vh)' },
          },
        },
      },
    },
    plugins: [],
  }