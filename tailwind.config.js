const plugin = require("tailwindcss/plugin")

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "default": ["\"Noto Sans KR\"", "sans-serif"]
    },
    extend: {
      colors: {
        zinc: {
          950: "#0c0c0e",
        }
      }
    }
  },
  plugins: [
    // https://tailwindcss.com/docs/functions-and-directives#using-apply-with-per-component-css
    plugin(function ({addComponents, theme}) {
      addComponents({ 
        // don't use in main components files
        // we have to add these classnames to .eslintrc - settings - tailwindcss - whitelist
        ".text-color-default": {
          color: theme("colors.zinc.900"),
        },
        ".dark .text-color-default": {
          color: theme("colors.zinc.300"),
        },
        ".text-color-hint": {
          color: theme("colors.zinc.500"),
        },
        ".dark .text-color-hint": {
          color: theme("colors.zinc.400"),
        },
        ".text-color-disabled": {
          color: theme("colors.zinc.300"),
        },
        ".dark .text-color-disabled": {
          color: theme("colors.zinc.500"),
        },
        ".bg-color-card": {
          backgroundColor: "#ffffff"
        },
        ".dark .bg-color-card": {
          backgroundColor: "#070708" // blending black and zinc-900 a bit 
        },
        ".border-color-card": {
          borderColor: theme("colors.zinc.100"),
        },
        ".dark .border-color-card": {
          borderColor: theme("colors.zinc.900"),
        },
      })
    })
  ]
}

