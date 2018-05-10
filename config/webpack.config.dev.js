const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const path = require('path');

const outputFile = 'vue-tel-input';
const globalName = 'VueTelInput';

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `${outputFile}.common.js`,
    library: globalName,
    libraryTarget: 'umd',
  },
  devtool: 'eval-source-map',
});
