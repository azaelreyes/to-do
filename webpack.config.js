const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
module.exports = {
  // other webpack options ...
  devtool: 'inline-source-map',
  // ...
};
