module.exports = {
    root: true,
    env: {
      node: true,
      browser: true
    },
    extends: [
      "plugin:vue/recommended",
      "eslint:recommended",
      "prettier/vue",
      "plugin:prettier/recommended"
    ],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      'linebreak-style': 'off',
      "vue/no-use-v-if-with-v-for": "off"
    },
    
    globals: {
      $nuxt: true
    },
    parserOptions: {
      parser: "babel-eslint"
    }
  };