import { globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config([
  globalIgnores(["node_modules", "dist", "examples"]),
  {
    name: "Base Configuration",
    files: ["src/**/*.ts", "src/**/*.tsx"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      react.configs.flat["recommended"],
      react.configs.flat["jsx-runtime"],
      reactHooks.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Too much existing code relies on non-null assertions
      "@typescript-eslint/no-non-null-assertion": "off",
      // Allow use of `delete` for record objects to support existing code
      "@typescript-eslint/no-dynamic-delete": "off",
      // Disable this rule because it's buggy and already handled by TypeScript
      "react/prop-types": "off",

      // Allow logical OR for empty strings
      "@typescript-eslint/prefer-nullish-coalescing": [
        "warn",
        { ignorePrimitives: { string: true } },
      ],

      // Don't restrict the use of template expressions for implicit string conversions
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allow: [{ name: ["Error", "URL", "URLSearchParams"], from: "lib" }],
          allowAny: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],
      // Enable React compiler checks
      "react-hooks/react-compiler": "error",
    },
  },
  {
    name: "Translations",
    files: ["src/locales/*.ts"],
    rules: {
      // Use of irregular whitespace for other languages is intentional
      "no-irregular-whitespace": "off",
    },
  },
]);
