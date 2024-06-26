import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {
            builder: {
                viteConfigPath: "./vite-storybook.ts"
            },
            strictMode: true,
        },
    },
    docs: {
        autodocs: "tag",
    },
    core: {
        disableTelemetry: true,
        builder: {
            name: '@storybook/builder-vite',
            options: {
                viteConfigPath: "./vite-storybook.ts"
            }
        }
    },
};
export default config;
