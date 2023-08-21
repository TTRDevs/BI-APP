# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Single Page Application Template Boilerplate

## Create project

    npm create vite@latest <project name> -- --template react-ts
    // npm 7+, extra double-dash is needed

## Dependencies

    npm i -D @typescript-eslint/eslint-plugin@latest
    eslint-plugin-react@latest
    @typescript-eslint/parser@latest
    eslint-config-react-app

    npm i -D prettier
    eslint-config-prettier
    eslint-plugin-prettier
    eslint-plugin-unicorn
    eslint-plugin-eslint-comments
    eslint-plugin-simple-import-sort

    npm i -D @types/node @types/react-dom

- Install [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb);
- Install [eslint-config-airbnb-typescript](https://www.npmjs.com/package/eslint-config-airbnb-typescript);

## Final Configurations

### Updated _.eslintrc.cjs_

     module.exports = {
      root: true,
      env: { browser: true, es2021: true },
      extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-hooks/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:unicorn/recommended',
        'plugin:prettier/recommended', // Leave always last
      ],
      ignorePatterns: ['dist', '.eslintrc.cjs'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './client/tsconfig.json',
      },
      plugins: [
        'react-refresh',
        '@typescript-eslint',
        'eslint-comments',
        'unicorn',
        'simple-import-sort',
        'prettier',
        'import',
      ],
      rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/accessible-emoji': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            // The default grouping, but with no blank lines.
            groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
          },
        ],
        'jsx-a11y/anchor-is-valid': [
          'error',
          {
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
            aspects: ['invalidHref', 'preferButton'],
          },
        ],
        // It's not accurate in the monorepo style
        'import/no-extraneous-dependencies': 'off',
        // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        'no-prototype-builtins': 'off',
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': 'off',
        // Use function hoisting to improve code readability
        'no-use-before-define': [
          'error',
          { functions: false, classes: true, variables: true },
        ],
        // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: true, variables: true, typedefs: true },
        ],
        // Common abbreviations are known and readable
        'unicorn/prevent-abbreviations': 'off',
        // Airbnb prefers forEach
        'unicorn/no-array-for-each': 'off',
        // It's not accurate in the monorepo style
        'import/no-extraneous-dependencies': 'off',
      },
    };

### Updated _.prettierrc_

    {
        "semi": true,
        "singleQuote": true,
        "printWidth": 90,
        "tabWidth": 2,
        "arrowParens": "always",
        "bracketSpacing": true,
        "embeddedLanguageFormatting": "auto",
        "htmlWhitespaceSensitivity": "css",
        "insertPragma": false,
        "jsxBracketSameLine": false,
        "jsxSingleQuote": false,
        "proseWrap": "preserve",
        "quoteProps": "as-needed",
        "requirePragma": false,
        "trailingComma": "es5",
        "useTabs": false
    }

### Updated _settings.json_

    {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnType": false, // required
        "editor.formatOnPaste": true, // optional
        "editor.formatOnSave": true, // optional
        "files.autoSave": "onFocusChange", // optional but recommended
        "editor.formatOnSaveMode": "file", // required to format on save
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
            },
    }

### Updated _tsconfig.json_

    {
     "compilerOptions": {
      "types": ["vite/client"],
      }

"include": ["src", "./tsconfig.json", "vite.config.ts"],
}

### Updated _packages.json_

    {
      "name": "client",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "lint:fix": "eslint ./src --ext .jsx,.js,.ts,.tsx --quiet --fix --ignore-path ./.gitignore",
        "lint:format": "prettier  --loglevel warn --write \"./**/*.{js,jsx,ts,tsx,css,md,json}\" ",
        "preview": "vite preview",
        "typecheck": "tsc --noEmit"
      },
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      },
      "devDependencies": {
        "@types/react": "^18.2.15",
        "@types/react-dom": "^18.2.7",
        "@typescript-eslint/eslint-plugin": "^6.2.0",
        "@typescript-eslint/parser": "^6.2.0",
        "@vitejs/plugin-react": "^4.0.3",
        "eslint": "^8.46.0",
        "eslint-config-airbnb": "^19.0.4",
        "eslint-config-airbnb-typescript": "^17.1.0",
        "eslint-config-prettier": "^8.9.0",
        "eslint-config-react-app": "^7.0.1",
        "eslint-plugin-eslint-comments": "^3.2.0",
        "eslint-plugin-import": "^2.28.0",
        "eslint-plugin-jsx-a11y": "^6.7.1",
        "eslint-plugin-prettier": "^5.0.0",
        "eslint-plugin-react": "^7.33.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.3",
        "eslint-plugin-simple-import-sort": "^10.0.0",
        "eslint-plugin-unicorn": "^48.0.1",
        "prettier": "^3.0.0",
        "typescript": "^5.0.2",
        "vite": "^4.4.5"
      }
    }

#### - References

- <https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions>
- <https://github.com/iamturns/create-exposed-app/blob/master/.eslintrc.js>

### React Redux + Material UI + Emotion

    npm i react-redux @reduxjs/toolkit @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-data-grid react-router-dom
