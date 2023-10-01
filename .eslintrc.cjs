module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'prettier.config.js'],
  plugins: ['react', 'react-refresh', 'simple-import-sort', 'import', 'prettier'],
  "parserOptions": {
    "ecmaVersion": 'latest'
  },
  rules: {
    'prefer-arrow-callback': 0,
    'react/prop-types': 0,
    'no-void': 0,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'no-param-reassign': 0,
    'sort-imports': ['error', {ignoreCase: true, ignoreDeclarationSort: true}],
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        pathGroups: [
          {
            pattern: '@(react|react-native)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      react: {
        version: 'detect',
      },
    },
  },
};
