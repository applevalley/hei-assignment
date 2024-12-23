module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  ignorePatterns: ["babel.config.js", "/dist/*", ".eslintrc.js", "scripts/**/*"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": ["error"],
    "no-console": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "react/react-in-jsx-scope": "off",
  },
};
