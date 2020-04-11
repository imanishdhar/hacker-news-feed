const withPWA = require('next-pwa');
module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  env: {
    APP_BASE_URI: 'https://hn.algolia.com/api/v1/search',
  },
});
