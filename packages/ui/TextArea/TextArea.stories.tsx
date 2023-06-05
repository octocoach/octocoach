import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof TextArea> = {
  title: "Atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    label: {
      name: "Label",
      type: "string",
      description: "Label Text",
    },
  },
  args: {
    label: "This is the label",
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const labelText = "Label";
export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textArea = await canvas.findByLabelText(labelText);
    await userEvent.type(textArea, "Hello");
  },
  args: { label: labelText },
};
