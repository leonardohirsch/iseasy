/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{html,js,vue,js,ts,jsx,tsx}',
    './src/views/**/*.{html,js,vue,js,ts,jsx,tsx}',
    './index.html',
    './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  relative: true,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
