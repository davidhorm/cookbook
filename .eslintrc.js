module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  env: {
    browser: true, // allow browser global variables
    es6: true,
    node: true, // allow Node.js global variables and Node.js scoping
    jest: true, // allow Jest global variables
  },
  extends: [
    'react-app',
    /**
     * React specific linting rules for ESLint
     * https://github.com/yannickcr/eslint-plugin-react#recommended
     */
    'eslint:recommended',
    'plugin:react/recommended',

    /**
     * This ESLint plugin enforces the Rules of Hooks.
     * https://reactjs.org/docs/hooks-rules.html
     * https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
     */
    'plugin:react-hooks/recommended',

    /**
     * This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues
     * with misspelling of file paths and import names. All the goodness that the ES2015+ static module
     * syntax intends to provide, marked up in your editor.
     * https://github.com/benmosher/eslint-plugin-import#rules
     */
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    /**
     * Static AST checker for accessibility rules on JSX elements.
     * https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#supported-rules
     */
    'plugin:jsx-a11y/recommended',

    /**
     * Various awesome ESLint rules
     * https://github.com/sindresorhus/eslint-plugin-unicorn#rules
     */
    'plugin:unicorn/recommended',

    /**
     * An ESLint plugin for linting ESLint plugins
     * https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin#supported-rules
     */
    'plugin:eslint-plugin/recommended',

    /**
     * Best practices when disabling ESLint rules
     * https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
     */
    'plugin:eslint-comments/recommended',

    /**
     * SonarJS rules for ESLint to detect bugs and suspicious patterns in your code.
     * https://github.com/SonarSource/eslint-plugin-sonarjs#eslint-plugin-sonarjs----
     */
    'plugin:sonarjs/recommended',

    /**
     * THESE PRETTIER RULES SHOULD ALWAYS BE LAST CONFIG IN EXTENDS ARRAY!
     * Turns off all ESLint rules that are unnecessary or might conflict with Prettier.
     * https://github.com/prettier/eslint-config-prettier
     */
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/unicorn',
  ],
  plugins: [
    'eslint-plugin', // Definitions for 'plugin:eslint-plugin/recommended'
    'eslint-plugin-tsdoc',

    /**
     * ESLint plugin to follow best practices and anticipate common mistakes when writing tests with Testing Library.
     * https://github.com/testing-library/eslint-plugin-testing-library#supported-rules
     */
    'testing-library',
  ],
  rules: {
    'tsdoc/syntax': 'warn',

    // Ignore kebabCase rule for React component files.
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['.tsx'],
      },
    ],

    // Disable because of <MDXProvider /> short codes
    'react/display-name': 'off',
  },
  overrides: [
    {
      files: ['*.spec.[jt]s[x]'],
      extends: [
        /**
         * ESLint plugin for Jest. Enabling all rules.
         * https://github.com/jest-community/eslint-plugin-jest#rules
         */
        'plugin:jest/all',

        /**
         * ESLint plugin to follow best practices and anticipate common mistakes when writing tests with jest-dom.
         * https://github.com/testing-library/eslint-plugin-jest-dom#supported-rules
         */
        'plugin:jest-dom/recommended',
      ],
      rules: {
        // Turn on mostly all testing-library rules
        // https://github.com/testing-library/eslint-plugin-testing-library#supported-rules
        'testing-library/await-async-query': 'error',
        'testing-library/await-async-utils': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debug': 'warn',
        'testing-library/no-dom-import': 'error',
        'testing-library/no-wait-for-empty-callback	': 'error',
        'testing-library/no-wait-for-empty-callback': 'error',
        'testing-library/prefer-explicit-assert': 'error',
        'testing-library/prefer-find-by': 'error',
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-screen-queries': 'error',
        'testing-library/prefer-wait-for': 'error',

        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-expect-assertions.md
        'jest/prefer-expect-assertions': 'off', // Not my style
        'jest/lowercase-name': 'off', // Only turned on for `it`
      },
    },
  ],
  ignorePatterns: ['public', '__mocks__', 'setup-test-env.js'],
  settings: {
    jsdoc: {
      mode: 'typescript', // Allows @template. https://github.com/gajus/eslint-plugin-jsdoc#mode
    },
  },
};
