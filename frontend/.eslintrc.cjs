module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './jsconfig.json',
  },
  plugins: ['prettier', 'eslint-plugin-import'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-unresolved': 'off',
  },
}
