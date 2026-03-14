import type { Meta, StoryObj } from "@storybook/react";
import { generateBlob } from "../generate-blob";
import Blob from "./Blob";

const meta: Meta<typeof Blob> = {
  title: "Components/Blob",
  component: Blob,
  tags: ["autodocs"],
  argTypes: {
    animated: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultBlob = generateBlob(200, 200);

export const Default: Story = {
  args: {
    ...defaultBlob,
    animated: true,
  },
};

export const Static: Story = {
  args: {
    ...defaultBlob,
    animated: false,
  },
};

export const Random: Story = {
  render: (args) => {
    const blob = generateBlob(args.width || 200, args.height || 200);
    return <Blob {...args} {...blob} />;
  },
  args: {
    animated: true,
    width: 200,
    height: 200,
  },
};
