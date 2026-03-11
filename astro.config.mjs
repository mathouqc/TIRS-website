import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { SITE_BASE_PATH, SITE_URL } from './src/site-config.mjs';

export default defineConfig({
	site: SITE_URL,
	base: SITE_BASE_PATH,
	i18n: {
		defaultLocale: 'fr',
		locales: ['fr', 'en'],
		routing: {
			prefixDefaultLocale: true,
		},
	},
	integrations: [mdx({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }), react()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	},
});
