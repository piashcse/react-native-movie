import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.jest } } }, // Add Jest globals here
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig, // Disables conflicting ESLint rules with Prettier
  {
    ignores: ['node_modules/', 'android/', 'ios/', 'build/'],
    plugins: { prettier: prettierPlugin, jest: jestPlugin }, // Register Jest and Prettier plugins
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'react-native/no-inline-styles': 'off',
      'prettier/prettier': 'error', // Enforce Prettier rules
      // Jest-specific rules (optional)
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
];
