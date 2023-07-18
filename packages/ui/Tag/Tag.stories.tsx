import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { Text } from "../Text/Text";

const meta: Meta<typeof Tag> = {
  title: "Atoms/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    children: { name: "Children", type: "function" },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: <Text>This text will apprear in the tag</Text> },
};
