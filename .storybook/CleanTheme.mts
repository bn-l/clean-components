import { create } from '@storybook/theming/create';
// @ts-expect-error
import logo from "../media/logo.svg";

export default create({
    base: 'light',
    brandTitle: 'My custom Storybook',
    brandUrl: 'https://example.com',
    brandImage: logo,
    brandTarget: '_self',
});