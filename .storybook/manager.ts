import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import CleanTheme from './CleanTheme.mts';

addons.setConfig({
    theme: CleanTheme,
});