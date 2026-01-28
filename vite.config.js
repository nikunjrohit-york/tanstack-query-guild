import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, ''); },
            },
            '/posts': {
                target: 'http://localhost:5000', // json-server default routes
                changeOrigin: true,
            },
            '/comments': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        }
    }
});
