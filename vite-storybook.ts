import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";


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
