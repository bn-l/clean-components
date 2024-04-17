
import css from "./Switch.module.css";

import { useEffect, useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { MouseEventHandler } from "react";


extend([namesPlugin]);

// Todo:
// ! Darkmodeswitch should pass styling props to underlying switch component. 
// ! @links in documentation!!s
// Add default colors that make it look like an ios switch


export enum Theme {
    Dark = "dark",
    Light = "light", 
}

export type AnyCSSColor = string;

export interface SwitchProps {
    /**
     * Whether the switch is checked on or not
     * @default false
     */
    checked?: boolean;
    /**
     * Scale in number of pixels. Default 16.
     */
    scale?: number;
    /**
     * The circle bit that's clicked on.
     * @default
     */
    knobColor?: AnyCSSColor;
    /**
     * The function run when the knob is switch is clicked.
     * @default Adds a "light" or "dark" color class name to the html element.
     */
    onToggle?: MouseEventHandler<HTMLInputElement>;
    /**
     * Icon to display on the knob. Default none. Can be an emoji or character. If an svg the
     * the height should be 100%.
     */
    icon?: JSX.Element | string | null | undefined;
    /**
     * The track the circle bit / knob rides in.
     */
    trackColor?: AnyCSSColor;
    /**
     * For small detailing
     * @default "#0000ff"
     */
    detailColor?: AnyCSSColor;
    /**
     * Aria label for the switch. 
     * See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
     */
    ariaLabel?: string;
    dropShadowColor?: AnyCSSColor;
}

export default function Switch(switchProps: SwitchProps) {


    const detailColor = colord(switchProps.detailColor!).isValid() ? 
        colord(switchProps.detailColor!).toHex() : 
        "pink";

    const dropShadowColor = colord(switchProps.dropShadowColor!).isValid() ? 
        colord(switchProps.dropShadowColor!).toHex() : 
        "#848484";

    const knobColor = colord(switchProps.knobColor!).isValid() ? 
        colord(switchProps.knobColor!).toHex() : 
        "#e8e8e8";

    const trackColor = colord(switchProps.trackColor!).isValid() ? 
        colord(switchProps.trackColor!).toHex() : 
        "#23db39";

    
    const {
        checked,
        onToggle = () => console.warn("Toggled switch without a toggle handler"),
        scale = 16,
        icon,
        ariaLabel
    } = switchProps;

    // const height = sizeMultiple * 36;
    // const width = sizeMultiple * 60;
    
    const styleVars = {
        "--knobColor": knobColor,
        "--trackColor": trackColor,
        "--detailColor": detailColor,
        "--dropShadowColor": dropShadowColor,
        "--scale": `${ scale }px`,
    } as React.CSSProperties;
    
    return (
        <div className={css.switch} style={styleVars}>       
            <label className={css.switchLabel} htmlFor="checkbox">
                <input 
                    className={css.switchInput} type="checkbox" id="checkbox" checked={!!checked} readOnly
                    onClick={onToggle}
                    aria-label={ariaLabel}
                />
                <div className={css.trackDiv}>
                    <div className={css.knobDiv}>
                        {icon}
                    </div>
                </div>
            </label>
        </div>
    );
}
