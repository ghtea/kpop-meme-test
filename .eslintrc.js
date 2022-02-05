module.exports = {
  "extends": ["next", "next/core-web-vitals", "plugin:tailwindcss/recommended"],
  "plugins": ["tailwindcss"],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "react-hooks/exhaustive-deps": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
  "settings": {
    "tailwindcss": {
      "callees": ["classnames", "clsx", "ctl"],
      "whitelist": [
        "text-color-default", "text-color-hint", "text-color-disabled",
        "bg-color-card", "border-color-card",
      ]
    }
  }
}