module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    createDefaultProgram: true,
  },
  ignorePatterns: [
    '**/node_modules',
    'environments',
    '**/public',
    '**/lib',
    '**/dist',
  ],
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier', 'prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        bracketSpacing: true,
        bracketSameLine: true,
        quoteProps: "consistent",
        singleQuote: true,
        trailingComma: "all",
        semi: false,
        tabWidth: 2,
        useTabs: false,
        printWidth: 90,
        arrowParens: "always",
        importOrder: [
          "^@root/(.*)$",
          "^@src/(.*)$",
          "^@listeners/(.*)$",
          "^@client/(.*)$",
          "^@modules/(.*)$",
          "^@models/(.*)$",
          "^@ui/(.*)$",
          "^@utils/(.*)$",
          "^@server/(.*)$",
          "^[./]",
        ],
        importOrderSortSpecifiers: true,
        endOfLine: "auto"
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
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
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
  },
}
