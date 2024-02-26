module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals',
  ],
  plugins: ['tailwindcss', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error'],
    indent: ['error', 2],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'react-hooks/exhaustive-deps': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
  settings: {
    tailwindcss: {
      callees: ['classnames', 'clsx', 'ctl'],
      whitelist: ['text-color-default', 'text-color-hint', 'text-color-disabled', 'bg-color-card', 'border-color-card'],
    },
  },
};
