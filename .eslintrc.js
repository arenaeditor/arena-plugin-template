module.exports = {
    'root': true,
    'env': {
        'browser': true,
        "node": true,
        'es6': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    "parser": "babel-eslint",
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        "ecmaFeatures": { // 添加ES特性支持，使之能够识别ES6语法
            "jsx": true,
        }
    },
    "plugins": [
        "react"
    ],
    'rules': {
        'global-require': 0,
        'import/no-unresolved': 0,
        'no-param-reassign': 0,
        'no-shadow': 0,
        'import/extensions': 0,
        'import/newline-after-import': 0,
        'no-multi-assign': 0,
        // allow debugger during development
        'no-debugger': 0,
        'max-len': 0,
        'no-console': 0,
        'camelcase': 0,
        'no-mixed-operators': 0,
        'no-trailing-spaces': 0,
        'no-underscore-dangle': 0,
        'no-unused-expressions': 0,
        'semi': ["error", "always"],
        "jsx-quotes": [2, "prefer-double"], //强制在JSX属性（jsx-quotes）中一致使用双引号
        "react/jsx-uses-vars": 2, //防止在JSX中使用的变量被错误地标记为未使用
        "react/jsx-uses-react": 1, //防止反应被错误地标记为未使用
        "react/jsx-equals-spacing": 2, //在JSX属性中强制或禁止等号周围的空格
    }
};