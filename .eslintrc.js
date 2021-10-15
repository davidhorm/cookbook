module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    /**
     * eslint-plugin-react@7.26.1
     * https://github.com/yannickcr/eslint-plugin-react
     */
    'plugin:react/recommended',

    /**
     * eslint-config-airbnb@18.2.1
     * is a collection of the following:
     *
     * eslint:recommended
     * https://eslint.org/docs/rules/
     *
     * eslint-plugin-react-hooks@4.2.0
     * https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
     *
     * eslint-plugin-jsx-a11y@6.4.1
     * https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
     *
     * eslint-plugin-import@2.25.2
     * https://github.com/import-js/eslint-plugin-import
     *
     * @typescript-eslint/eslint-plugin@5.0.0
     * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
     */
    'airbnb',

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md#when-not-to-use-it
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
    // Feel okay turning off because can rely on syntax highlighting
    'react/no-unescaped-entities': 0,

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md#extensions-default-jsx
    // Allow tsx to have JSX syntax
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],

  },
};
