import type { Preview } from "@storybook/react";
import React, { useEffect, useRef } from "react";
import { bg, themeClass } from "../theme.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "The chosen user theme",
      defaultValue: "latte",
      toolbar: {
        title: "Theme",
        items: ["latte", "frappe", "macchiato", "mocha"],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: { disable: true },
    layout: "centered",
  },
  decorators: [
    (Story, { globals }) => {
      const body = useRef(document.querySelector(".sb-show-main"));
      useEffect(() => {
        const docsStory = document.querySelector(".docs-story");
        docsStory?.classList.add(bg);
        if (body.current) {
          body.current.classList.add(bg);
        }
      }, [body.current]);

      useEffect(() => {
        ["latte", "frappe", "macchiato", "mocha"].forEach((theme) => {
          body.current?.classList.remove(themeClass[theme]);
        });
        body.current?.classList.add(themeClass[globals.theme]);
      }, [body.current, globals.theme]);

      return <Story />;
    },
  ],
};

export default preview;
