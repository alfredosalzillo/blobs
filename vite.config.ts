// @ts-expect-error
import react from "@vitejs/plugin-react";
import preserveDirectives from "rollup-plugin-preserve-directives";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      include: ["src"],
      insertTypesEntry: true,
    }),
    preserveDirectives({
      exclude: ["**/*.scss"],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        'Blob/index': resolve(__dirname, "src/Blob/index.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
