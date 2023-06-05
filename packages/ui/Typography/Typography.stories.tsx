import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: { children: "Heading 1", element: "h1" },
};
export const Heading2: Story = {
  args: { children: "Heading 2", element: "h2" },
};
export const Paragraph: Story = {
  args: { children: "Heading 3", element: "p" },
};
