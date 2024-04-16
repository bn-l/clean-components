
import css from "./DarkModeSwitch.module.css";
import SunIcon from "./SunIcon.tsx";
import MoonIcon from "./MoonIcon.tsx";
import { createTheme, style } from '@vanilla-extract/css';

import { useEffect, useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";


extend([namesPlugin]);


export enum Theme {
    Dark = "dark",
    Light = "light", 
}

export interface DarkModeSwitchColors {
    /**
      * Fill color of the icon
      */
    iconLightColor?: string;
    /**
     * Fill color of the icon
     */
    iconDarkColor?: string;
    /**
     * The circle bit that's clicked on.
     */
    knobLightColor?: string;
    /**
     * The circle bit that's clicked on. 
     */
    knobDarkColor?: string;
    /**
     * The track the circle bit / knob rides in.
     */
    trackLightColor?: string;
    /**
     * The track the circle bit / knob rides in.
     */
    trackDarkColor?: string;
    /**
     * Used to set the address bar color on safari in dark mode by adding a meta tag to 
     * the head with this color.
     * @default undefined
     */
    addressBarDark?: string;
    /**
     * Used to set the address bar color on safari in light mode by adding a meta tag to 
     * the head with this color.
     * @default undefined
     */
    addressBarLight?: string;
    /**
     * For small detailing
     * @default "#0000ff"
     */
    detailLightColor?: string;
    /**
     * For small detailing
     * @default "#0000ff"
     */
    detailDarkColor?: string;

    dropShadowLight?: string;
    dropShadowDark?: string;
    [colorName: string]: string | undefined;
}

export interface DarkModeSwitchProps {
    /**
     * Any valid css color value. Should be the set to the default background color for 
     * light mode. An invalid color will revert to white.
     */
    lightColor: string;
    /**
     * Any valid css color value. Should be the set to the default background color for 
     * light mode. An invalid color will revert to black.
     */
    darkColor: string;
    /**
     * A float or int to multiply the size by (can make small or bigger);
     */
    sizeMultiple?: number;
    /**
     * The function run when the knob is switch is clicked.
     * @default Adds a "light" or "dark" color class name to the html element.
     */
    onToggle?: (theme: Theme | null) => void;
    /**
     * Whether to show a sun / moon icon on the knob
     * @default true
     */
    icon?: boolean;
    /**
     * Whether to set the address color.
     * @default true
     */
    setAddressBar?: boolean;
    /**
     * An object used to customise the components colors. By default it uses shades of light or dark to colorise the component so this can be safely ignored. If there are errors in the 
     * colors set here it will revert to default.
     */
    colors?: DarkModeSwitchColors;
}

const localStorageKey = "darkmodeswitch-theme"

function getTheme() {
    const localTheme = window.localStorage.getItem(localStorageKey);
    const mediaQueryDarkTheme = !!window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches;
    
    return localTheme
        ? localTheme as Theme
        : mediaQueryDarkTheme
        ? Theme.Dark
        : Theme.Light
}

const startingTheme = getTheme();

/**
 * By default adds a "light" or "dark" color class name to the html element when the switch is 
 * toggled. It also:
 *  - Stores this value to localstorage using the key: "darkmodeswitch-theme"
 *  - Respects the user's / system darkmode preference (this becomes the default starting theme)
 *  - Listens for changes to the dark mode media query and responds (e.g. if the user's os changes
 *     the preference from light to dark at a certain time of day, the component will update).
 */
export default function DarkModeSwitch({ lightColor, darkColor, onToggle, icon = true, setAddressBar = true, colors, sizeMultiple = 1 }: DarkModeSwitchProps) {

    const height = sizeMultiple * 36;
    const width = sizeMultiple * 60;
    lightColor = colord(lightColor).isValid() ? lightColor : "white";
    darkColor = colord(darkColor).isValid() ? darkColor : "black";

    if (colors) {
        for (const key in colors) {
            if (colors[key] && !colord(colors[key]!).isValid()) {
                delete colors[key];
            }
        }
    }
    
    // Setting default values
    const { 
        iconLightColor = darkColor,
        iconDarkColor = lightColor,
        knobLightColor = colord(darkColor).lighten(0.8).toHex(),
        knobDarkColor = colord(lightColor).darken(0.9).toHex(),
        trackLightColor = colord(darkColor).toHex(),
        trackDarkColor = colord(lightColor).toHex(),
        addressBarDark = darkColor,
        addressBarLight = lightColor,
        detailLightColor = colord(lightColor).darken(0.1).rotate(15).saturate().toHex(),
        detailDarkColor = colord(darkColor).darken(0.1).rotate(15).saturate().toHex(),
        dropShadowLight = colord(lightColor).alpha(0.2).toHex(),
        dropShadowDark = colord(darkColor).alpha(0.2).toHex(),
    } = colors ?? {};

    const [theme, setTheme] = useState<Theme>(startingTheme);
    
    const changeTheme: DarkModeSwitchProps["onToggle"] = onToggle ? onToggle : 
        (theme: Theme | null) => {
            theme ??= Theme.Light;
            setTheme(theme);
            const existingClases = document.documentElement.className.replace(/light|dark/gi, "").split(/\s+/g);
            existingClases.push(theme);
            document.documentElement.className = existingClases.join(" ").trim();
            // document.documentElement.className = theme;
            window.localStorage.setItem(localStorageKey, theme);
        };            
         
    useEffect(() => {

        // Set up theme to change event
        const handleThemeChange = (event: MediaQueryListEvent) => {
            changeTheme(event.matches ? Theme.Dark : Theme.Light);
        };
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleThemeChange);
        return () => {
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handleThemeChange);
        };

    }, []);

    useEffect(() => {
        // Setting address bar color on macos and ios safari
        
        const meta = document.querySelector("meta[name=\"theme-color\"]");
        if (setAddressBar) {

            if (meta) {
                meta.setAttribute("content", theme === Theme.Dark ? addressBarDark : addressBarLight);
            }
            else {
                const newMeta = document.createElement("meta");
                newMeta.name = "theme-color";
                newMeta.content = theme === Theme.Dark ? addressBarDark : addressBarLight;
                document.head.appendChild(newMeta);
            }
        }
    }, [addressBarDark, addressBarLight, setAddressBar, theme]);
    

    const styleVars = {
        "--knobColor": theme === Theme.Light ? knobLightColor : knobDarkColor,
        "--trackColor": theme === Theme.Light ? trackLightColor : trackDarkColor,
        "--detailColor": theme === Theme.Light ? detailLightColor : detailDarkColor,
        "--dropShadow": theme === Theme.Light ? dropShadowLight : dropShadowDark,
        "--height": `${ height }px`,
        "--width": `${ width }px`,
    } as React.CSSProperties;

    let Icon: JSX.Element | null = null;

    if (icon) {
        Icon = theme === Theme.Light ? 
            <MoonIcon fill={iconLightColor} height={`${ height * 0.45 }px`} width={`${ width * 0.27 }px`} className=""/> : 
            <SunIcon fill={iconDarkColor} height={`${ height * 0.45 }px`} width={`${ width * 0.27 }px`} className=""/>;
    }

    
    return (
        <div className={css.darkModeSwitch} style={styleVars}>       
            <label className={css.switchLabel} htmlFor="checkbox">
                <input 
                    className={css.switchInput} type="checkbox" id="checkbox" checked={theme === Theme.Light} readOnly
                    onClick={() => changeTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)} 
                />
                <div className={css.trackDiv}>
                    <div className={css.knobDiv}>
                        {Icon}
                    </div>
                </div>
            </label>
        </div>
    );
}
