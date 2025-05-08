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
    '/in-english/': '/en/',
    '/fi/in-english/': '/en/',
    '/palvelumuotoilu-kuntien-ja-kaupunkien-kehittamisen-tukena/': '/fi/blog/palvelumuotoilu-kuntien-kehittamisessa/',
    '/fi/palvelumuotoilu-kuntien-ja-kaupunkien-kehittamisen-tukena/': '/fi/blog/palvelumuotoilu-kuntien-kehittamisessa/',
    '/design-thinking-prosessi-joka-sytyttaa-luovuuden-liekin/': '/fi/blog/design-thinking-prosessi-joka-sytyttaa-luovuuden-liekinfi/',
    '/blogi/': '/fi/blog/',
    '/hyvan-kehityskeskustelun-malli/': '/fi/blog/',
    '/insinoorilahtoisyys-uhka-vai-mahdollisuus/': '/fi/blog/insinoorilahtoisyys-uhka-vai-mahdollisuusfi/',
    '/empatia-palvelumuotoilussa/': '/fi/blog/empatia-palvelumuotoilussafi/',
    '/kaytettavyys-ja-ergonomia-sujuvan-ja-terveellisen-tyoskentelyn-perusta/': '/fi/blog/kaytettavyys-ja-ergonomia-sujuvan-ja-terveellisen-tyoskentelyn-perustafi/'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});