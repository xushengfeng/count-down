import { defineConfig } from "electron-vite";
import * as path from "path";

export default defineConfig({
    main: {
        build: {
            rollupOptions: {
                external: ["@electron-toolkit/utils"],
            },
        },
    },
    renderer: {
        build: {
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, "src/renderer/main.html"),
                },
            },
        },
    },
});
