module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'operator-assignment': 0,
      },
    },
    {
      files: ['test/**/*.ts'],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/promise-function-async': 0,
        '@typescript-eslint/no-empty-function': 0,
        'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
        'class-methods-use-this': 0,
        'consistent-return': 0,
        'max-len': 0,
        'no-bitwise': 0,
        'no-continue': 0,
        'no-nested-ternary': 0,
        'no-param-reassign': 0,
        'no-plusplus': 0,
        'no-underscore-dangle': ['error', { allowAfterThis: true }],
        'no-use-before-define': 0,
        'prefer-destructuring': 0,
        'import/no-default-export': ['error'],
        'import/no-named-as-default-member': 0,
        'import/no-named-as-default': 0,
        'import/prefer-default-export': 0,
        'mocha-no-only/mocha-no-only': 'error',
        'prettier/prettier': 'error',
      },
    },
    {
      files: ['src/bin/*.ts'],
      rules: {
        '@typescript-eslint/no-floating-promises': 0,
      },
    },
  ],
};
