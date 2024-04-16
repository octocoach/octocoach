import { Meta, StoryObj } from "@storybook/react";
import { ReactNode } from "react";

import { vars } from "../theme.css";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Atoms/Stack",
  component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      width: 100,
      height: 50,
      background: vars.color.overlays[2],
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

export const Basic: Story = {
  args: {
    children: (
      <>
        {["One", "Two", "Three"].map((n, i) => (
          <Item key={i}>{n}</Item>
        ))}
      </>
    ),
  },
};
