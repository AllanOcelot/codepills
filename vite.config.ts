import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Set the root directory
  build: {
    outDir: 'dist', // Output directory for build
    rollupOptions: {
      input: './index.html', // Ensure entry point for the build
    },
  },
});
