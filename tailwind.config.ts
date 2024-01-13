module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.html'],
  mode: 'jit',
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 0px 60px 20px #a31caf27',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-50': '#fdf4ff',
        'primary-100': '#fae8ff',
        'primary-200': '#f5d0fe',
        'primary-300': '#f0abfc',
        'primary-400': '#e879f9',
        'primary-500': '#d946ef',
        'primary-600': '#c026d3',
        'primary-700': '#a21caf',
        'primary-800': '#86198f',
        'primary-900': '#701a75',
        'primary-950': '#4a044e',
        'background-800': '#131313',
      },
    },
  },
  plugins: [],
}
