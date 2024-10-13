import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
    {
        ignores: ['**/node_modules/', '.dist/'],
        languageOptions: {
            globals: {
                ...globals.node,
                process: 'readonly',
            },
        },

        rules: {
            'no-unused-vars': 'error',
            'no-unused-expressions': 'error',
            'prefer-const': 'error',
            'no-console': 'warn',
            'no-undef': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },

    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
]

/* import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  { */
// ignores: ["**/node_modules/", "**/dist/"],
/*   }
) */
