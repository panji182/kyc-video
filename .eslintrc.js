module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },

    env: {
      browser: true,
      node: true,
      es6: true,
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
      },
    },

    plugins: ["@typescript-eslint"],
    extends: [
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "plugin:prettier/recommended",
      "plugin:react-hooks/recommended",
    ],

    rules: {
      "no-unused-vars": "error",
      "react-hooks/exhaustive-deps": "off",
      "quotes": ["warn", "double"],
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
      ],
      "react/jsx-props-no-spreading": "off",
      "react-hooks/rules-of-hooks": "warn",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "no-nested-ternary": "off",
      "import/prefer-default-export": "off",
    },
}