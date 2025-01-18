import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/codepills/' : '/', // Use /codepills/ when building
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html', // Entry point for the build
    },
  },
}));