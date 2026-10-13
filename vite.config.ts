import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Clean config without Replit specific tracking plugins
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  }
});
