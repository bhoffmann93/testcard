import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  server: {
    port: '8080',
    open: 'index.html',
  },
  publicDir: 'static',
  plugins: [glsl()],
});
