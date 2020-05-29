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
    ],
}