import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import sentry from '@sentry/astro';
import vercel from '@astrojs/vercel/serverless';

import { loadEnv } from 'vite';
const { SENTRY_DSN, SENTRY_PROJECT, SENTRY_AUTH_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    tailwind(),
    svelte(),
    sentry({
      dsn: SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: SENTRY_PROJECT,
        authToken: SENTRY_AUTH_TOKEN
      }
    })
  ]
});
