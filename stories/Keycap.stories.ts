
import Keycap from "../source/Keycap/Keycap.tsx";

import type { Meta, StoryObj } from "@storybook/react";


const meta = {
    title: "Misc/Keycap",
    component: Keycap,
    parameters: {
        layout: "centered",
    },
    // Automatically creates docs for component
    tags: ["autodocs"],
    
    argTypes: {
        active: {
            type: "boolean",
        },
        children: {
            type: "string",    
        },
        word: {
            type: "string",
        },
        darkMode: {
            type: "boolean",
        },
        width: {
            control: { type: "range", min: 1, max: 10, step: 1 }, 
        },
        scale: {
            control: { type: "range", min: 1, max: 100, step: 1 },
        },
        alignment: {
            control: { type: "inline-radio", options: ["left", "right"] },
        },
    },
    // appears to be for generally applied / default args
    args: { },
} satisfies Meta<typeof Keycap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "⌘",
        word: "command",
        width: 6.5,
    },
};

