import DarkModeSwitch from "../source/DarkModeSwitch/DarkModeSwitch.tsx";
import "./DarkModeSwitch.stories.css";
import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";

// For testing. The testing from storybook (as "chromatic") does not seem better than vitest 
//  and is very badly documented.
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
        scale: {
            control: { type: "range", min: 4, max: 50, step: 2 }, 
        },
    },
    // appears to be for generally applied / default args
    args: { },
} satisfies Meta<typeof DarkModeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;



// this could also be a template. See: https://storybook.js.org/docs/writing-stories/stories-for-multiple-components#creating-a-template-component
export const Default: Story = {
    args: {
        lightColor: "#FBFAFF",
        darkColor: "#1C1924",
    },
    render: (args) => {

        const [theme, setTheme] = useState<"light" | "dark">("light");

        const toggleTheme = () =>  setTheme(theme => theme === "light" ? "dark" : "light");

        useEffect(() => {
            const handleKeyPress = (event: KeyboardEvent) => {
                if (event.key === "t") {
                    toggleTheme();
                }
            };
            document.addEventListener("keypress", handleKeyPress);
            return () => document.removeEventListener("keypress", handleKeyPress);
        }, []);

        const style = {
            "--bg-dark": args.darkColor,
            "--bg-light": args.lightColor,
            "position": "relative",
        } as React.CSSProperties;

        return (
            <div 
                style={style} 
                className="DarkModeSwitchCanvas"
            >
                <div id="theme-label">{theme}</div>
                <DarkModeSwitch {...args} stateManager={[theme, setTheme]} />
            </div>
        )
    }
};

