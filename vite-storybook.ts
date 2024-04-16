import { defineConfig } from "vite";
import { glob } from "glob";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css"
import { resolve, relative, extname, parse } from "node:path";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: true,
    },
    plugins: [react(), ],
    css: {
        modules: {
            localsConvention: "camelCase",
            scopeBehaviour: "local", 
        }
    }
});
