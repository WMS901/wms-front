import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.sol-wms.store",
        // target: "http://localhost:8081",
        //target: "http://195.168.9.111:1040",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
