import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081", // ✅ 백엔드 서버로 프록시 요청
        //target: "http://195.168.9.111:1040",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
