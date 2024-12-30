import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: [
				'Atkinson Hyperlegible',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji',
				'sans-serif'
			],
			serif: [
				'Atkinson Hyperlegible',
				'ui-serif',
				'Georgia',
				'Cambria',
				'Times New Roman',
				'Times',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Apple Color Emoji',
				'Noto Color Emoji',
				'sans-serif'
			]
		},
		lineHeight: {
			DEFAULT: '1.5',
			1: '1',
			1.5: '1.5',
			1.6: '1.6'
		},
		extend: {}
	},

	plugins: []
} satisfies Config;
