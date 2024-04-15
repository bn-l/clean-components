import { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import CleanTheme from './CleanTheme.mts';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            theme: CleanTheme,
        }
    },
};

export default preview;
