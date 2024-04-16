
import css from "./Keycap.module.css";


export interface KeycapProps {

    /**
     * The key label. Can be a single character (e.g. "⌘" or "🌏") or number or an element
     *  (e.g. svg). If an element it should scale to fit its container with height & width 100%.
     */
    children: string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    /**
     * The label for the key. Used primarily on apple keyboards. E.g. "command". If not given, the
     * nested child element / string / number will be centered and enlarged.
     */
    word?: string;
    /**
     * Dark keycap.
     */
    darkMode?: boolean;
    /**
     * Width in em units (with the base being the scale prop)
     * @default 5
     */
    width?: number;
    /**
     * Scale in pixels.
     * @default 16
     */
    scale?: number;
    /**
     * For a key with a word.
     * @default right
     */
    alignment?: "left" | "right";
    /**
     * Whether the key should appear pressed down. Useful for typying simulation without
     * activating the underlying button.
     * @default false
     */
    active? : boolean;
}


// function getDarkPref() {
//     const mediaQueryDarkTheme = !!window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches;
//     const darkRoot = document.documentElement.className.includes("dark")

//     return darkRoot || mediaQueryDarkTheme;
// }

// const darkPref = getDarkPref();


/**
 * Can be scaled to almost any size (will depend on the smallest font the browser will show).
 * For use in a simulated keyboard, iterate over an array of [word, char] pairs, where word is
 * a word like "command" and char is an svg component (for symbol keys) or a character. 
 * Keypress visuals can be done by listening for key down and checking in the loop if the current
 * key matches the keydown key.
 */
export default function Keycap({ word, darkMode = false, children, width = 5, scale = 16, alignment = "right", active = false }: KeycapProps) {


    const style = {
        "--width": `${width}em`,
        "--scale": `${scale}px`,
        "--iconAlign": alignment === "right" ? "flex-end" : "flex-start",
    } as React.CSSProperties; 

    return (
        word ?
        <div className={`${css.keyboard} ${darkMode ? css.dark : ""}`} style={style}>
            <button 
                className={active ? `${css.key} ${css.active}` : `${css.key}` } 
                type="button" data-key="cmd"
            >
                <div className={`${css.label} ${css.wordKeyLabel}`}>
                    <div 
                        className={css.wordKeyIcon} 
                        aria-hidden
                    >
                        {children}
                    </div>
                    <small 
                        className={css.wordKeyText}
                    >
                        {word}
                    </small>
                </div>
            </button>
        </div> :
        <div className={`${css.keyboard} ${darkMode ? css.dark : ""}`} style={style}>
            <button 
                className={active ? `${css.key} ${css.active}` : `${css.key}` } 
                type="button" data-key="v"
            >
                <div 
                    className={css.label}
                >
                    <span 
                        className={css.charKeyText}
                    >
                        {children}
                    </span>
                </div>
            </button>
        </div>
    )
}