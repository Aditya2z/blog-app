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
    // Disable the "react/no-unescaped-entities" rule
    "react/no-unescaped-entities": 0,

    // Disable the "jsx-a11y/label-has-associated-control" rule
    "jsx-a11y/label-has-associated-control": 0,
  },
};
