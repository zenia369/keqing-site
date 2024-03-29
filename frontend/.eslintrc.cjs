module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:cypress/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:lit/recommended',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.js', '.ts'],
  },
  plugins: [
    'prettier',
    'eslint-plugin-import',
    'cypress',
    'mocha',
    'chai-friendly',
    '@typescript-eslint',
    'lit',
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
}
