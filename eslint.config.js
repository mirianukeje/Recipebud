// Flat ESLint config for this project (no external plugins)
export default [
  {
    ignores: ["node_modules/"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        fetch: "readonly",
        alert: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "res|next|^err" }],
      "arrow-body-style": ["error", "as-needed"],
      "no-param-reassign": ["error", { props: false }],
      "no-console": "warn",
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      "func-names": "off",
      "space-unary-ops": "error",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "comma-dangle": "off",
      "max-len": "off",
      "no-underscore-dangle": "off",
      "consistent-return": "off",
      radix: "off",
      "no-shadow": [
        "error",
        { hoist: "all", allow: ["resolve", "reject", "done", "next", "err", "error"] }
      ],
      "no-unused-expressions": "off",
    },
  },
];

