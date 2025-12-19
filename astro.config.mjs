// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Server mode for SSR, pages with prerender = true are pre-rendered
  adapter: node({
    mode: 'standalone'
  }),
});
