module.exports = {
  "extends": [
    "plugin:flowtype/recommended",
    "airbnb"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false
  },
  "plugins": [
    "flowtype",
    "prefer-object-spread",
    "class-property",
  ],
  "globals": {
    "Bugsnag": false,
    "FB": false,
    "fetch": false,
    "ga": false,
    "google": false,
    "heap": false,
    "HelloSign": false,
    "Intercom": false,
    "L": false,
    "Plaid": false,
    "PUBNUB": false,
    "Stripe": false
  },
  "rules": {
    "react/prefer-stateless-function": [2, { ignorePureComponents: true }],
    "react/sort-comp": [1, {
      order: [
        '/^props$/',
        '/^state$/',
        'type-annotations',
        'static-methods',
        'getters',
        'lifecycle',
        '/^on.+$/',
        '/^handle.+$/',
        'render',
        'everything-else'
      ]
    }],
    "react/prop-types": [0],
    "react/jsx-closing-bracket-location": [1, {
      "nonEmpty": "after-props",
      "selfClosing": "tag-aligned"
    }],
    "react/jsx-no-bind": [1, {
      "ignoreRefs": false,
      "allowArrowFunctions": false,
      "allowBind": false
    }],
    "camelcase": 1,
    "lines-between-class-members": 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "import/no-unresolved": [2, { "ignore": ["react"] }],
    "import/prefer-default-export": 0,
    "new-cap": 1,
    "no-underscore-dangle": 1,
    "no-use-before-define": 1,
    "prefer-destructuring": 0,
    "prefer-object-spread/prefer-object-spread": 2,
    "react/require-default-props": 0,
    "react/default-props-match-prop-types": 0,
    "react/jsx-first-prop-new-line": [1, "multiline-multiprop"],
    "react/destructuring-assignment": 0,
    "function-paren-newline": 0,
    "jsx-a11y/accessible-emoji": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/aria-activedescendant-has-tabindex": 0,
    "jsx-a11y/aria-props": 0,
    "jsx-a11y/aria-proptypes": 0,
    "jsx-a11y/aria-role": 0,
    "jsx-a11y/aria-unsupported-elements": 0,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/html-has-lang": 0,
    "jsx-a11y/iframe-has-title": 0,
    "jsx-a11y/img-redundant-alt": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/lang": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "jsx-a11y/no-access-key": 0,
    "jsx-a11y/no-autofocus": 0,
    "jsx-a11y/no-distracting-elements": 0,
    "jsx-a11y/no-redundant-roles": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/role-has-required-aria-props": 0,
    "jsx-a11y/role-supports-aria-props": 0,
    "jsx-a11y/scope": 0,
    "jsx-a11y/tabindex-no-positive": 0,
    "max-len": ["error", {
      "code": 120,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreUrls": true,
      "ignoreTrailingComments": true,
      "ignoreComments": true
    }],
    "flowtype/no-weak-types": [1, {
      "any": true,
      "Object": true,
      "Function": true
    }],
    "react/no-did-mount-set-state": 0,
    "react/no-did-update-set-state": 0,
    "react/no-did-mount-set-state": 0,
    "react/no-did-update-set-state": 0,
    "react/no-direct-mutation-state": 0,
    "react/no-this-in-sfc": 0,
    "react/jsx-no-target-blank": 0,
    "no-magic-numbers": 0,
    "flowtype/require-parameter-type": 0,
    "flowtype/type-id-match": [
      0,
      "^([A-Z][a-z0-9]*)+Type$"
    ],
    "flowtype/sort-keys": [
      0,
      "asc", {
        "caseSensitive": true,
        "natural": false
      }
    ],
    "flowtype/require-valid-file-annotation": [
      0,
      "always"
    ],
    "flowtype/require-exact-type": [
      0,
      "always"
    ],
  },
};

