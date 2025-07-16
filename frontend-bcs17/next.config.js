const { i18n } = require("./next-i18next.config");

module.exports = {
  output: 'standalone',
  i18n,
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:3000'
  }
};
