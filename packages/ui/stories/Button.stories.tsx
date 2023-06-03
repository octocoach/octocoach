import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { bg, themeClass } from "../theme.css";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    children: { name: "Children", type: "string" },
    color: { name: "Color", type: "string" },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className={`${themeClass.latte} ${bg}`}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Primary", color: "primary" },
};
export const Secondary: Story = {
  args: { children: "Secondary", color: "secondary" },
};
