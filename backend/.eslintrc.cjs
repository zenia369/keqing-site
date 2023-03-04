module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './jsconfig.json',
  },
  plugins: ['prettier', 'eslint-plugin-import', 'jest'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    camelcase: 'off',
    'import/no-dynamic-require': 'off',
  },
  globals: {
    request: 'readonly',
    app: 'readonly',
  },
}
