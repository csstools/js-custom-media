import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'index.js',
	output: [
		{ file: 'index.browser.js', format: 'iife' }
	],
	plugins: [
		babel({
			presets: [
				['@babel/env', { modules: false, targets: 'ie >= 9' }]
			]
		}),
		terser()
	]
};
