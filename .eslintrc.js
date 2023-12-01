/* eslint-disable quotes */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "linebreak-style": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    quotes: ["error", "double"],
    "react/no-unescaped-entities": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "react/jsx-wrap-multilines": ["error"],
    "class-methods-use-this": ["error"],
    "react/jsx-props-no-spreading": ["off"],
    "react/destructuring-assignment": ["off"],
    "react/prop-types": ["off"],
  },
};
