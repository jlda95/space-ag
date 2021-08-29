module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  parserOptions: {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
    "ecmaVersion": 11,
  },
  plugins: [],
  // add your custom rules here
  rules: {}
}
