import DarkModeSwitch from "../source/DarkModeSwitch/DarkModeSwitch.tsx";
import "./DarkModeSwitch.stories.css";

import type { Meta, StoryObj } from "@storybook/react";

// The testing is pretty useless and very badly documented.
import { fn } from "@storybook/test";  


const meta = {
    title: "Theming/DarkModeSwitch",
    component: DarkModeSwitch,
    parameters: {
        layout: "centered",
    },
    // Automatically creates docs for component
    tags: ["autodocs"],
    
    // Gives this prop a color selector
    argTypes: {
        lightColor: {
            control: {
                type: "color",
            },
        },
        darkColor: {
            control: {
                type: "color",
            },
        },
        sizeMultiple: {
            control: { type: "range", min: 0.5, max: 5, step: 0.1 }, 
        },
    },
    // appears to be for generally applied / default args
    args: { },
} satisfies Meta<typeof DarkModeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        lightColor: "#FBFAFF",
        darkColor: "#1C1924",
    },
};

