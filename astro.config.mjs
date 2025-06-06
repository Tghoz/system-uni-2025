// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';



import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: "standalone",
  }),
  redirects: {
    "/.well-known/appspecific/com.chrome.devtools.json": "/",
  },
});
