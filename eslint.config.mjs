// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

import graphqlPlugin from '@graphql-eslint/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/public/**',
      '**/.cache/**',
      '.log/**',
      '**/.yarn/**',
      'gatsby-types.d.ts',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // GraphQL processor for TS/TSX files
  {
    files: ['**/*.ts', '**/*.tsx'],
    processor: graphqlPlugin.processor,
  },

  // GraphQL files
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      '@graphql-eslint/no-anonymous-operations': 'error',
      '@graphql-eslint/naming-convention': [
        'error',
        {
          OperationDefinition: {
            style: 'PascalCase',
            forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
            forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
          },
        },
      ],
    },
  },
  {
    files: ['graphql.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off', // disables "'require' is not defined"
    },
  },

  // Prettier
  eslintConfigPrettier,
)
