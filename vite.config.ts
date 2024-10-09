import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  define: {
    'process.env': process.env
  },
  build: {
    rollupOptions: {
      input: {
        main: "src/index.html",
        popup: "src/popup/index.html",
        side_panel: "src/sidepanel/index.html",
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
