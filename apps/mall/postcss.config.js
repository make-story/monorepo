// PostCSS
// https://nextjs.org/docs/advanced-features/customizing-postcss-config
module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        browsers: '< 99.5% in KR',
      },
    ],
  ],
};

/*module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['< 99.5% in KR'],
    }),
  ],
};*/
