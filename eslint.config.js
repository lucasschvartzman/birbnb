import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",

      "no-unused-vars": "off",

      "max-len": "off",
      "indent": "off",
      "quotes": "off",
      "semi": "off",
      "comma-dangle": "off",
      "arrow-parens": "off",
      "object-curly-spacing": "off",
      "array-bracket-spacing": "off",
      "space-before-function-paren": "off",
      "trailing-comma": "off",
    },
  },
  prettier,
];