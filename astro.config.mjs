// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://goodside.fi/',
  i18n: {
    defaultLocale: 'fi',
    locales: ['fi', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    react(),
    sitemap()
  ],
  redirects: {
    '/in-english/': '/en/'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});