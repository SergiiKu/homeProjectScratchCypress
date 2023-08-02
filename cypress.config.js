const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://scratch.mit.edu/',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
