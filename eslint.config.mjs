// @ts-check

import url from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    plugins: {
      ["jsx-a11y"]: jsxA11yPlugin,
      ["next"]: nextPlugin,
      ["react-hooks"]: reactHooksPlugin,
      ["react"]: reactPlugin,
      ["simple-import-sort"]: simpleImportSortPlugin,
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: [
          "tsconfig.json",
          "./apps/*/tsconfig.json",
          "./packages/*/tsconfig.json",
        ],
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
      "simple-import-sort/imports": "error",
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/*.test.*",
      "typings/**/*",
    ],
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Rules for the Next.js Website

  {
    files: ["apps/web/**/*.{js,ts,jsx,tsx}"],
    extends: [
      ...compat.config(reactPlugin.configs.recommended),
      ...compat.config(reactPlugin.configs["jsx-runtime"]),
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(jsxA11yPlugin.configs.recommended),
      ...compat.config(nextPlugin.configs.recommended),
      ...compat.config(nextPlugin.configs["core-web-vitals"]),
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/display-name": "off",
    },
  },

  // Rules for the ui package

  {
    files: ["packages/ui/**/*.{ts,tsx}"],
    extends: [
      ...compat.config(reactPlugin.configs.recommended),
      ...compat.config(reactPlugin.configs["jsx-runtime"]),
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(jsxA11yPlugin.configs.recommended),
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/display-name": "off",
    },
  },
  {
    ignores: ["**/.storybook/"],
  },

  // Globals for eslint config

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
