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
        copyPublicDir: false,
        minify: false,
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, "source/index.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            treeshake: true,
            external: ["react", "react/jsx-runtime"], 
            input: Object.fromEntries(
                glob.sync("source/**/*.{ts,tsx,mts}").map(file => [
                    // get the relative path of the file
                    // source/nested/foo.ts -> nested/foo
                    relative( "source", file.slice(0, file.length - extname(file).length) ),
                    // get absolute path of file
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
            }
        },
    },
    plugins: [react(), libInjectCss(), dts({ exclude: ["stories"] })],
    css: {
        modules: {
            localsConvention: "camelCase",
            scopeBehaviour: "local", 
        }
    }
});
