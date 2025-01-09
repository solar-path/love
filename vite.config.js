import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "app/assets"),
      "@components": path.resolve(__dirname, "app/components"),
      "@routes": path.resolve(__dirname, "app/routes"),
      "@helpers": path.resolve(__dirname, "app/helpers"),
      "@database": path.resolve(__dirname, "app/database"),
    },
  },
});
