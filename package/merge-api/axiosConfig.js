const axios = require('axios');

const { setupCache } = require('axios-cache-adapter');

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  exclude: {
    query: false
  },
  readHeaders: false
});

let api;

const init = () => {
  api = axios.create({
    adapter: cache.adapter
  });
};

module.exports = params => {
  if (!api) {
    init();
  }

  return api(params);
};
