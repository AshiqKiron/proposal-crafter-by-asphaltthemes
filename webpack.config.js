const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const devHost = 'wpmvc.local';

module.exports = {
	...defaultConfig,
	entry: {
		// Script
		'js/dashboard': './resources/dashboard/index.jsx',
		'js/gutenberg': './resources/gutenberg/index.js',
		'js/frontend': './resources/frontend/index.js',
		// Style
		'css/dashboard': './resources/scss/dashboard.scss',
		'css/gutenberg': './resources/scss/gutenberg.scss',
		'css/frontend': './resources/scss/frontend.scss',
	},
	output: {
		path: path.resolve(__dirname, './assets/build/'),
		filename: '[name].js',
		clean: false,
	},
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: 'auto',
		port: 8887,
		host: devHost,
		proxy: {
			'/assets/build': {
				pathRewrite: {
					'^/assets/build': '',
				},
			},
		},
		headers: { 'Access-Control-Allow-Origin': '*' },
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.m?js$/,
				type: 'javascript/auto',
				resolve: {
					fullySpecified: false,
				},
			},
		],
	},
	resolve: {
		alias: {
			'@dashboard': path.resolve(__dirname, './resources/dashboard'),
			'@gutenberg': path.resolve(__dirname, './resources/gutenberg'),
			'@scss': path.resolve(__dirname, './resources/scss'),
			'@blocks': path.resolve(__dirname, './assets/blocks'),
		},
		fullySpecified: false,
		extensions: [
			'.ts',
			'.tsx',
			...(defaultConfig.resolve
				? defaultConfig.resolve.extensions || ['.js', '.jsx']
				: []),
		],
	},
};
