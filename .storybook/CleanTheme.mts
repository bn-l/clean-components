import { create } from '@storybook/theming/create';
// @ts-expect-error
import logo from "../media/logo-with-text.svg";

export default create({
    base: 'light',
    brandTitle: 'Clean Components',
    brandUrl: 'https://bn-l.github.io/clean-components/',
    brandImage: logo,
    brandTarget: '_self',

});