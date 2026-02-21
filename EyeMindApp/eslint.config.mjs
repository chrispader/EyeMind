import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { createRequire } from 'node:module';
import tseslint from 'typescript-eslint';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const prettierConfig = require('eslint-config-prettier');

export default [
  // Global ignores: build output, configs outside tsconfig, and generated files
  {
    ignores: [
      'src/renderer/src/routeTree.gen.ts',
      'environments',
      '**/node_modules',
      'out/',
      'eslint.config.mjs',
      'playwright.config.ts',
      'vitest.config.ts',
    ],
  },

  // TypeScript recommended (v8 flat config via typescript-eslint)
  ...tseslint.configs.recommended,

  // Project options, Prettier, React Hooks, and rule overrides
  {
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.node.json', './tsconfig.web.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'warn',

      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportNamedDeclaration[declaration=null]',
          message:
            'Use inline exports instead of exporting identifiers at the end of the file.',
        },
      ],

      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: false,
          allowNullableObject: false,
          allowNumber: false,
          allowNullableBoolean: true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: false,
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
];
