import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    commonjs(), // Usar el plugin CommonJS
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/', 
});
