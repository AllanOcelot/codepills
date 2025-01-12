import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Set the root directory
  build: {
    outDir: '../dist', // Output directory for build
    rollupOptions: {
      input: './src/index.html', // Ensure entry point for the build
    },
  },
});
