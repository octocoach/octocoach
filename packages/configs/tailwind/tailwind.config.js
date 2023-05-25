const {
  variants: { latte, mocha },
} = require("@catppuccin/palette");

module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/container-queries"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: latte.mauve.hex,
          secondary: latte.pink.hex,
          accent: latte.teal.hex,
          neutral: latte.text.hex,
          "base-100": latte.base.hex,
          "base-200": latte.mantle.hex,
          "base-300": latte.crust.hex,
          info: latte.blue.hex,
          success: latte.green.hex,
          warning: latte.yellow.hex,
          error: latte.red.hex,
        },
      },
      {
        dark: {
          primary: mocha.mauve.hex,
          secondary: mocha.pink.hex,
          accent: mocha.teal.hex,
          neutral: mocha.text.hex,
          "base-100": mocha.base.hex,
          "base-200": mocha.mantle.hex,
          "base-100": mocha.crust.hex,
          info: mocha.blue.hex,
          success: mocha.green.hex,
          warning: mocha.yellow.hex,
          error: mocha.red.hex,
        },
      },
    ],
  },
};
