import { defineConfig, globalIgnores } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import perfectionist from 'eslint-plugin-perfectionist'
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import cspellConfigs from '@cspell/eslint-plugin/configs'

export default defineConfig(
  globalIgnores(['node_modules', 'dist', 'example'], 'Global Ignores'),
  {
    name: 'Base Configuration',
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      react.configs.flat['recommended'],
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat['recommended-latest'],
      comments.recommended,
    ],
    plugins: {
      perfectionist,
    },
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    settings: {
      react: { version: 'detect' },
      perfectionist: { type: 'natural', ignoreCase: true },
    },
    rules: {
      // It's silly to enforce separate destructuring just to have some variables be const
      'prefer-const': ['error', { destructuring: 'all' }],
      // Too much existing code relies on non-null assertions
      '@typescript-eslint/no-non-null-assertion': 'off',
      // Allow use of `delete` for record objects to support existing code
      '@typescript-eslint/no-dynamic-delete': 'off',
      // Disable this rule because it's buggy and already handled by TypeScript
      'react/prop-types': 'off',

      // Allow logical OR for empty strings
      '@typescript-eslint/prefer-nullish-coalescing': [
        'warn',
        { ignorePrimitives: { boolean: true, string: true } },
      ],
      // Sort imports and exports to improve readability
      'perfectionist/sort-imports': ['warn', { tsconfig: { rootDir: import.meta.dirname } }],
      'perfectionist/sort-named-imports': 'warn',
      'perfectionist/sort-exports': 'warn',
      'perfectionist/sort-named-exports': 'warn',
      // Sort type constituents to improve readability
      'perfectionist/sort-intersection-types': [
        'warn',
        { groups: ['literal', 'unknown', 'nullish'] },
      ],
      'perfectionist/sort-union-types': ['warn', { groups: ['literal', 'unknown', 'nullish'] }],
      // Don't allow disabling ESLint rules without justification
      '@eslint-community/eslint-comments/require-description': [
        'warn',
        { ignore: ['eslint-enable'] },
      ],

      // Improve code readability by enforcing type import syntax
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // Don't restrict the use of template expressions for implicit string conversions
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allow: [{ name: ['Error', 'URL', 'URLSearchParams'], from: 'lib' }],
          allowBoolean: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],
      // Allow unused variables that have been prefixed with '_'
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    name: 'English Translation',
    extends: [cspellConfigs.recommended],
    files: ['src/locales/en-US.ts'],
    rules: {
      '@cspell/spellchecker': [
        'warn',
        {
          cspell: {
            language: 'en-US',
            words: [
              'Rootbotics',
              'Ewen',
              'Leder',
              'Riverfolk',
              'chokepoints',
              'Corvid',
              'Corvids',
              'Woodfolk',
              'Lilypad',
              'waystation',
              'Waystations',
              'Deepwood',
              'unexhausted',
              'Foxburrow',
              'Mousehold',
              'Rabbittown',
              'Ronin',
              'Togglable',
            ],
          },
        },
      ],
    },
  },
  {
    name: 'Other Translations',
    files: ['src/locales/*.ts'],
    ignores: ['src/locales/en-US.ts'],
    rules: {
      // Use of irregular whitespace for other languages is intentional
      'no-irregular-whitespace': 'off',
    },
  },
)
