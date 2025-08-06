import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/wp-json": {
        target: "https://cablecommunity.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
