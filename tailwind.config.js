/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        customcl: '#fafafa',
        btcl: '#db918c',
        inptcl: 'rgb(229, 226, 226)',
        vinecl: '#470b0b'
        
      },
    },
  },
  plugins: [],
}

