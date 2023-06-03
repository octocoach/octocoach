import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "../TextArea/TextArea";
import { bg, themeClass } from "../theme.css";

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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    console.log(canvas);
  },
  args: {},
};
