
import Switch from "../source/Switch/Switch";
import { useState, useEffect } from "react";

import type { Meta, StoryObj } from "@storybook/react";



const meta = {
    title: "UI/Switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    // Automatically creates docs for component
    tags: ["autodocs"],

    // Gives this prop a color selector
    argTypes: {
        checked: {
            control: {
                type: "boolean",
            },
        },
        scale: {
            control: { type: "range", min: 4, max: 50, step: 2 }, 
        },
        knobColor: {
            control: {
                type: "color",
            },
        },
        trackColor: {
            control: {
                type: "color",
            },
        },
        detailColor: {
            control: {
                type: "color",
            },
        },
        dropShadowColor: {
            control: {
                type: "color",
            },
        },
        icon: {
            control: {
                type: "text",
            },
        },
    },
    // appears to be for generally applied / default args
    args: { },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        checked: false,
    },
    render: (args) => {
        const [checked, setChecked] = useState(args.checked);

        useEffect(() => {
            setChecked(args.checked);
        }, [args.checked]);

        return (
            <Switch 
                {...args} 
                checked={checked} 
                onToggle={() => setChecked(!checked)} 
            />
        )
    }
};

