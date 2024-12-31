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
        login: resolve(__dirname, 'src/pages/login/loginPage.html'),
        findUser: resolve(__dirname, 'src/pages/login/findUserId.html'),
        signUp: resolve(__dirname, 'src/pages/sign-up/index.html'),
        editProfile: resolve(__dirname, 'src/pages/edit-profile/index.html'),
        reserved: resolve(__dirname, 'src/pages/reserved/index.html'),
        review: resolve(__dirname, 'src/pages/review/index.html'),
        feed: resolve(__dirname, 'src/pages/feed/index.html'),
        savedPlaces: resolve(__dirname, 'src/pages/saved-places/index.html'),
        noticeBooking: resolve(__dirname, 'src/pages/notice-booking/index.html'),
        coupon: resolve(__dirname, 'src/pages/coupon/index.html'),
        map: resolve(__dirname, 'src/pages/map/index.html'),
      },
    },
  },
});
