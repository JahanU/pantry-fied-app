module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: 1,
    'react-native/react-native': true
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'react-native', 'jsx-a11y', 'import'],
  rules: {
    'class-methods-use-this': 'off',
    // "default-case": "off",
    eqeqeq: 'off',
    'global-require': 'off',
    // "import/no-dynamic-require": "off",
    indent: ['error', 2],
    // "func-names": "off",
    // "global-require": "off",
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'linebreak-style': 'off',
    'max-len': ['error', { code: 140, tabWidth: 4, ignoreComments: true }],
    // "no-bitwise": "off",
    // "no-cond-assign": "off",
    'no-console': 'off',
    // "no-continue": "off",
    // "no-control-regex": "off",
    'no-empty': ['error', { allowEmptyCatch: true }],
    // "no-eval": "off",
    // "no-irregular-whitespace": "off",
    // "no-lonely-if": "off",
    // "no-mixed-operators": "off",
    // "no-multi-spaces": "off",
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-globals': 'off',
    // "no-restricted-syntax": "off",
    // "no-underscore-dangle": "off",
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'no-use-before-define': 'off',
    'object-curly-newline': ['error', { minProperties: 5, multiline: true, consistent: true }],
    /* "prefer-destructuring": ["error", {
            "array": false,
            "object": true
        }], */
    // "quote-props": "off"
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/no-unused-state': 'warn',
    'react/prop-types': 'off',
    'react/sort-comp': [
      2,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'render'],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount'
          ]
        }
      }
    ]
  },
  globals: {
    document: 1,
    localStorage: 1
  }
};
