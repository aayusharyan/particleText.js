// @ts-check
// Configures the Astro docs site with Starlight, theme plugins, and assets.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import starlightThemeObsidian from 'starlight-theme-obsidian';

// https://astro.build/config
// Builds the docs site configuration, wiring theme integrations, navigation, and assets.
export default defineConfig({
	site: 'https://particletext.js.org', // Update with your actual domain
	prefetch: true,
	vite: {
		resolve: {
			alias: {
				path: 'path-browserify',
			},
		},
		optimizeDeps: {
			include: ['micromatch'],
			// Polyfill minimal process vars so micromatch can run in the browser bundle.
			esbuildOptions: {
				define: {
					'process.env.NODE_ENV': JSON.stringify('development'),
					'process.platform': JSON.stringify('browser'),
					'process.env': JSON.stringify({}),
				},
			},
		},
	},
	integrations: [
		starlight({
			plugins: [
				starlightThemeObsidian({
					graphConfig: {
						backlinks: true,
						graph: true,
						trackVisitedPages: 'session',
						actions: ['fullscreen', 'depth', 'reset-zoom', 'render-arrows'],
					}
				})
			],
			title: 'ParticleText.js',
			description: 'A vanilla JavaScript particle text animation library',
			logo: {
				src: './public/logo.png',
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/aayusharyan/particleText.js',
				},
			],
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.png',
						type: 'image/png',
						sizes: '512x512',
					},
				},
				{
					tag: 'script',
					attrs: {
						src: '/particleText.js',
					},
				},
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Basic Usage', slug: 'getting-started/basic-usage' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Initialization', slug: 'api-reference/initialization' },
						{ label: 'Configuration', slug: 'api-reference/configuration' },
						{ label: 'Methods', slug: 'api-reference/methods' },
						{ label: 'Properties', slug: 'api-reference/properties' },
					],
				},
				{
					label: 'Examples',
					items: [
						{ label: 'Overview', slug: 'examples' },
						{ label: 'Basic Example', slug: 'examples/basic' },
						{
							label: 'Colors',
							items: [
								{ label: 'Single Color', slug: 'examples/colors/single-color' },
								{ label: 'Multi Color', slug: 'examples/colors/multi-color' },
								{ label: 'Theme Colors', slug: 'examples/colors/theme-colors' },
							],
						},
						{
							label: 'Sizing',
							items: [
								{ label: 'Small Text', slug: 'examples/sizing/small-text' },
								{ label: 'Medium Text', slug: 'examples/sizing/medium-text' },
								{ label: 'Large Text', slug: 'examples/sizing/large-text' },
							],
						},
						{
							label: 'Particles',
							items: [
								{ label: 'Particle Density', slug: 'examples/particles/density' },
								{ label: 'Explosion Radius', slug: 'examples/particles/explosion-radius' },
								{ label: 'Friction Effects', slug: 'examples/particles/friction' },
							],
						},
						{
							label: 'Responsive',
							items: [
								{ label: 'Breakpoints', slug: 'examples/responsive/breakpoints' },
							],
						},
						{
							label: 'Advanced',
							items: [
								{ label: 'Manual Control', slug: 'examples/advanced/manual-control' },
								{ label: 'Custom Breakpoints', slug: 'examples/advanced/custom-breakpoints' },
								{ label: 'Error Handling', slug: 'examples/advanced/error-handling' },
								{ label: 'Slow Browser', slug: 'examples/advanced/slow-browser' },
							],
						},
						{
							label: 'Cursor Tracking',
							items: [
								{ label: 'Restricted Tracking', slug: 'examples/cursor/restricted-tracking' },
								{ label: 'Comparison', slug: 'examples/cursor/comparison' },
							],
						},
						{
							label: 'Performance',
							items: [
								{ label: 'Max Particles', slug: 'examples/performance/max-particles' },
							],
						},
					],
				},
				{
					label: 'Framework Integration',
					items: [
						{ label: 'Overview', slug: 'frameworks' },
						{ label: 'React', slug: 'frameworks/react' },
						{ label: 'Vue', slug: 'frameworks/vue' },
						{ label: 'Angular', slug: 'frameworks/angular' },
						{ label: 'Svelte', slug: 'frameworks/svelte' },
						{ label: 'Next.js', slug: 'frameworks/nextjs' },
						{ label: 'Nuxt', slug: 'frameworks/nuxt' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Breakpoint System', slug: 'guides/breakpoint-system' },
						{ label: 'Performance Optimization', slug: 'guides/performance-optimization' },
						{ label: 'Multiple Instances', slug: 'guides/multiple-instances' },
						{ label: 'Accessibility', slug: 'guides/accessibility' },
					],
				},
				{
					label: 'Playground',
					items: [
						{ label: 'Interactive Playground', slug: 'playground' },
					],
				},
				{
					label: 'Troubleshooting',
					items: [
						{ label: 'Common Issues', slug: 'troubleshooting/common-issues' },
						{ label: 'Browser Support', slug: 'troubleshooting/browser-support' },
					],
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
		mdx(),
		react(),
		sitemap(),
	],
});
