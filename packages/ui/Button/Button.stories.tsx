import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: { name: "Label", type: "string" },
    color: { control: "select", options: ["brand", "accent"] },
  },
  parameters: {
    handles: ["click"],
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Primary", color: "brand" },
};
