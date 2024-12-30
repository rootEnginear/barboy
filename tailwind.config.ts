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
			DEFAULT: '1.4',
			1: '1',
			1.4: '1.4',
			1.5: '1.5',
			1.6: '1.6'
		},
		spacing: {
			0: '0',
			1: '1px',
			2: '2px',
			4: '4px',
			6: '6px',
			8: '8px',
			12: '12px',
			16: '16px',
			24: '24px',
			32: '32px',
			48: '48px',
			64: '64px',
			list: '2ch'
		},
		extend: {}
	},

	plugins: []
} satisfies Config;
