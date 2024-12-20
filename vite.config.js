import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/login/index.html'),
        signUp: resolve(__dirname, 'src/pages/sign-up/index.html'),
        reserved: resolve(__dirname, 'src/pages/reserved/index.html'),
        review: resolve(__dirname, 'src/pages/review/index.html'),
        feed: resolve(__dirname, 'src/pages/feed/index.html'),
        savedPlaces: resolve(__dirname, 'src/pages/saved-places/index.html'),
      },
    },
  },
});
