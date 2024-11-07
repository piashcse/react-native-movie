import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig, // Disables conflicting ESLint rules with Prettier
  {
    ignores: ['node_modules/', 'android/', 'ios/', 'build/'],
    plugins: { prettier: prettierPlugin }, // Register the Prettier plugin
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'react-native/no-inline-styles': 'off',
      'prettier/prettier': 'error', // Enforce Prettier rules
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
];
