import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tslint from 'typescript-eslint';

export default defineConfig(
    globalIgnores(['**/dist', '*.config.js']),
    eslint.configs.recommended,
    tslint.configs.recommendedTypeChecked,
    tslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
    },
    {
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
        },
    },
);
