module.exports = {
  entry: "./src/app.ts",
  mode: "production",
  target: "node",
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
