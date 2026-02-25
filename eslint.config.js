// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tseslint = require('@typescript-eslint/eslint-plugin');

module.exports = defineConfig([
	expoConfig,
	{
		ignores: ['dist/*'],
        
		plugins: {
			'@typescript-eslint': tseslint,
		},

		rules: {
			indent: [
				'error',
				'tab',
				{
					SwitchCase: 1,
				},
			],

			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'no-undef': 'off',
			'func-names': 'warn',
			'consistent-return': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-expressions': 'warn',
			'no-console': 'warn',
		},
	},
]);
