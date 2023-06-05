import { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { vars } from "../theme.css";
import { ReactNode } from "react";

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
        {["One", "Two", "Three"].map((n) => (
          <Item>{n}</Item>
        ))}
      </>
    ),
  },
};
