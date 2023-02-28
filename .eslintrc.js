module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: [
    "@babel",
    "@babel/plugin-proposal-class-properties",
    "react",
    "react-hooks",
  ],
  rules: {
    // "linebreak-style": 0,
    // "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off",
    "react/jsx-wrap-multilines": "off",

    "import/prefer-default-export": "off",
    "no-console": "off",
  },
};
