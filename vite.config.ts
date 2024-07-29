import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SeaWords/',
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    port: 4200,
    host: '0.0.0.0',
    hmr: true,
    open: true,
  },
})
