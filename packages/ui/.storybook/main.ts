import type { StorybookConfig } from "@storybook/react-vite";
import { globbySync } from "globby";

const config: StorybookConfig = {
  stories: globbySync(
    [
      "../**/*.mdx",
      "../**/*.stories.@(js|jsx|ts|tsx)",
      "!../**/node_modules/**/*",
    ],
    { cwd: "./.storybook" }
  ),
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
