/* globals module */

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'react/no-unescaped-entities': 0,
        'react/prop-types': 0,
        'react/display-name': 0,
        'no-console': 2,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
