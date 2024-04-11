// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import url from "node:url";
import tseslint from "typescript-eslint";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default tseslint.config(
  {
    plugins: {
      ["next"]: nextPlugin,
      ["react"]: reactPlugin,
      ["react-hooks"]: reactHooksPlugin,
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ["./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/*.test.*", "typings/*"],
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Rules for the Next.js Website

  {
    files: ["apps/web/**/*.{js,ts,jsx,tsx}"],
    extends: [
      ...compat.config(reactPlugin.configs["jsx-runtime"]),
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(nextPlugin.configs.recommended),
      ...compat.config(nextPlugin.configs["core-web-vitals"]),
    ],
  },
  {
    files: ["eslint.config.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  }
);
