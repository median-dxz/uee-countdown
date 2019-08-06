module.exports = {
  root: true,
  parserOptions: {
      "parser": "babel-eslint",
      "ecmaVersion": 2017,
      "sourceType": "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  
  extends: [
    'plugin:vue/essential',
     "@vue/prettier"
  ],
  
  plugins: [
    'vue',
    'prettier'
  ],

  globals: {
    __static: true
  },

  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,

    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    'no-extra-parens': 0,
    'no-multi-str': 0,
    'no-multiple-empty-lines': [0, {'max': 3}]
  },
  
}
