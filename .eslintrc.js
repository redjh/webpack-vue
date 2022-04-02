const { resolve } = require('path');
const isProd = process.env.NODE_ENV === 'production' ? true : false;
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest', // 设置版本就不会报错了（Parsing error: Unexpected token import）
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-console': isProd ? 2 : 0,
    'vue/multi-word-component-names': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 'off',//临时解决
  },
};
