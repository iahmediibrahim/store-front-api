module.exports = {
  env: { commonjs: true, es2021: true, node: true, jest: true, jasmine: true },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 12 },
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } }
  },
  rules: {
    semi: ['error', 'never'],
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto', singleQuote: true, parser: 'typescript' }
    ],
    'no-use-before-define': ['error', { functions: true, classes: true }],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-var': 'error',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'prefer-const': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', '': 'never' }
    ]
  }
}
