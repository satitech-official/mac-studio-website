import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const pagesEntry = fileURLToPath(
  new URL("./github-pages/index.html", import.meta.url),
);

export default defineConfig({
  base: "/mac-studio-website/",
  plugins: [react()],
  build: {
    outDir: "dist/pages",
    emptyOutDir: true,
    rollupOptions: {
      input: pagesEntry,
    },
  },
});
