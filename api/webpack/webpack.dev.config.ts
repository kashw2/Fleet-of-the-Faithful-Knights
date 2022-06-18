module.exports = {
  entry: "./src/app.ts",
  mode: "development",
  devtool: "source-map",
  target: "node",
  externals: {
    "express": "express"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
    ],
  },
  output: {
    globalObject: "typeof self !== 'undefined' ? self : this", // See https://github.com/webpack/webpack/issues/6522
    libraryTarget: "umd",
    filename: 'api.js'
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ['src', 'node_modules']
  }
};
