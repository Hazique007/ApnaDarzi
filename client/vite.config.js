import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://apnadarzi-31.onrender.com", // Your backend server
        changeOrigin: true, // Handle CORS by modifying the origin of the request
        secure: false, // Use this if your backend server is using self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Rewrite path if needed
      },
    },
  },
});
