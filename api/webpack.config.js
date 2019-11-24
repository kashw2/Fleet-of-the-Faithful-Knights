const path = require("path");
const merge = require("webpack-merge");

module.exports = merge({
    entry: path.resolve(__dirname, "../core"),
    mode: "development",
    devtool: "inline-source-map",
    output: {
        filename: "lib.js",
        path: path.resolve(__dirname, "../core/dist"),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ["ts-loader"],
            },
        ],
    },
});
