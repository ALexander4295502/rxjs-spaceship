const glob = require("glob");

module.exports = {
  entry: glob.sync("./src/js/*.js"),
  output: {
    filename: "bundle.js"
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
