module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: 'babel-eslint', // Specifies the ESLint parser
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in
    ],
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
    plugins: ['prettier'],
    overrides: [
        {
            files: ['**/src/**/*.ts', '**/src/**/*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: [
                'eslint:recommended',
                'plugin:prettier/recommended',
                'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
                'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
            ],
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2018,
                sourceType: 'module',
                project: './tsconfig.json',
            },
            plugins: ['prettier', '@typescript-eslint'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
                'no-dupe-class-members': 'off',
            },
        },
        {
            files: ['**/test/**/*.js'],
            env: {
                mocha: true,
            },
        },
    ],
};
