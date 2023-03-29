import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/categorys": {
        target: "https://mevn-nikeshoes-api.vercel.app/",
        changeOrigin: true,
      },
      "/carts": {
        target: "https://mevn-nikeshoes-api.vercel.app/",
        changeOrigin: true,
      },
      "/orders": {
        target: "https://mevn-nikeshoes-api.vercel.app/",
        changeOrigin: true,
      },
      "/users": {
        target: "https://mevn-nikeshoes-api.vercel.app/",
        changeOrigin: true,
      },
    },
  },
});
