import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: "src/widget.tsx",
      name: "SiftWidget",
      formats: ["iife"],
      fileName: () => "v1.js",
    },
    outDir: "../public/widget",
    emptyOutDir: true,
    minify: "esbuild",
  },
});
