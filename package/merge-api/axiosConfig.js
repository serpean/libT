const { setup } = require("axios-cache-adapter");

const api = setup({
  cache: {
    maxAge: 15 * 60 * 1000
  }
});

module.exports = api;
