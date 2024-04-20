
import css from "./DarkModeSwitch.module.css";
import SunIcon from "./SunIcon.tsx";
import MoonIcon from "./MoonIcon.tsx";

import { useEffect, useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import Switch from "../Switch/Switch.tsx";


extend([namesPlugin]);


export type Theme = "light" | "dark";

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
     * Scale in number of pixels. Default 16.
     */
    scale?: number;
    /**
     * The function run when the knob is switch is clicked.
     * @default Adds a "light" or "dark" color class name to the html element.
     */
    onToggle?: (theme: Theme | null) => void;
    /**
     * Whether to show a sun / moon icon on the knob
     * @default true
     */
    showIcon?: boolean;
    /**
     * Whether to set the address color.
     * @default true
     */
    setAddressBar?: boolean;
    /**
     * An object used to customise the components colors. By default it uses shades of light or dark to colorise the component so this can be safely ignored. If there are errors in the 
     * colors set here it will revert to default.
     */
    colors?: DarkModeSwitchColors
    /**
     * If set will use this to get and set state instead of its own internal getting and setter.
     * Takes a tuple of the current state (which can be the strings "light or "dark") and a 
     * function that takes that takes those strings to set state somewhere else.
     * You can give it the return value of setState<"light" | "dark">("light").
     */
    stateManager?: [
        Theme,
        React.Dispatch<React.SetStateAction<Theme>>
    ]
}

const localStorageKey = "darkmodeswitch-theme"

function getStartingTheme() {
    const localTheme = window.localStorage.getItem(localStorageKey);
    const mediaQueryDarkTheme = !!window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches;
    
   if (localTheme === "light") return "light"
   else if (localTheme === "dark") return "dark"
   else if (mediaQueryDarkTheme) return "dark"
   else return "light"
}

const startingTheme = getStartingTheme();

/**
 * By default adds a "light" or "dark" color class name to the html element when the switch is 
 * toggled. It also:
 *  - Stores this value to localstorage using the key: "darkmodeswitch-theme"
 *  - Respects the user's / system darkmode preference (this becomes the default starting theme)
 *  - Listens for changes to the dark mode media query and responds (e.g. if the user's os changes
 *     the preference from light to dark at a certain time of day, the component will update).
 */
export default function DarkModeSwitch({ lightColor, darkColor, onToggle, showIcon = true, setAddressBar = true, colors, scale = 16, stateManager }: DarkModeSwitchProps) {

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


    const [theme, setTheme] = stateManager ? stateManager : useState(startingTheme);
    
    const changeTheme: DarkModeSwitchProps["onToggle"] = onToggle ? onToggle : 
        (theme: Theme | null) => {
            theme ??= "light";
            setTheme(theme);
            const existingClases = document.documentElement.className.replace(/light|dark/gi, "").split(/\s+/g);
            existingClases.push(theme);
            document.documentElement.className = existingClases.join(" ").trim();
            // document.documentElement.className = theme;
            window.localStorage.setItem(localStorageKey, theme);
        };            
         
    useEffect(() => {

        changeTheme(startingTheme)

        // Set up theme to change event
        const handleThemeChange = (event: MediaQueryListEvent) => {
            changeTheme(event.matches ? "dark" : "light");
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
                meta.setAttribute("content", theme === "dark" ? addressBarDark : addressBarLight);
            }
            else {
                const newMeta = document.createElement("meta");
                newMeta.name = "theme-color";
                newMeta.content = theme === "dark" ? addressBarDark : addressBarLight;
                document.head.appendChild(newMeta);
            }
        }
    }, [addressBarDark, addressBarLight, setAddressBar, theme]);
    

    let Icon: JSX.Element | null = null;

    if (showIcon) {
        Icon = theme === "light" ? 
            <MoonIcon fill={iconLightColor} className="" style={{height: "100%"}}/> : 
            <SunIcon fill={iconDarkColor} className="" style={{height: "100%"}}/>;
    }

    return (
        <Switch
            checked={theme === "light"}
            scale={scale}
            knobColor={theme === "light" ? knobLightColor : knobDarkColor}
            onToggle={() => changeTheme(theme === "light" ? "dark" : "light")}
            icon={Icon}
            trackColor={theme === "light" ? trackLightColor : trackDarkColor}
            detailColor={theme === "light" ? detailLightColor : detailDarkColor}
            ariaLabel="Switch to set light or dark theme"
            dropShadowColor={theme === "light" ? dropShadowLight : dropShadowDark}
        />
    )
}
