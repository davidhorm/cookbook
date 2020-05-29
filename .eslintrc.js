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
         * Best practices when disabling ESLint rules
         * https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
         */
        'plugin:eslint-comments/recommended',
    ],
}