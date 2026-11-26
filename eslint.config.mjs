import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import path from 'node:path';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/out/**',
    '**/coverage/**',
    '**/next-env.d.ts',
  ]),
  {
    files: ['apps/api/**/*.ts'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['apps/web/**/*.{js,jsx,mjs,ts,tsx}'],
    extends: [nextVitals, nextTypescript],
    settings: {
      next: { rootDir: path.join(import.meta.dirname, 'apps/web') },
    },
  },
  prettier,
]);
