import { FlatCompat } from '@eslint/eslintrc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
    ignores: [
      'node_modules/**',
      '.next/**',
      './src/generated/prisma/client/**/*',
      './src/generated/prisma/client/wasm.js',
      '**/node_modules/**',
      '**/.next/**',
    ],
  },
];

export default eslintConfig;
