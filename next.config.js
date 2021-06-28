const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withImages(
  withCSS({
    publicRuntimeConfig: {
      localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
        ? process.env.LOCALE_SUBPATHS
        : 'none',
    },
    // eslint-disable-next-line no-unused-vars
    webpack: (config, options) => {
      // eslint-disable-next-line no-param-reassign
      config.node = {
        fs: 'empty'
      };
      return config;
    },
  })
);
