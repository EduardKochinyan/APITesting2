const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      token: "6ecc0e074532ad9cc7bf182856506b9fa8b2d21ac352c76f187fc2a503eafbe8", // Replace with your actual GoRest API token
    },
  },
});
