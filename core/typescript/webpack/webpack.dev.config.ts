module.exports = {
    entry: "./src/index.ts",
    mode: "development",
    devtool: "source-map",
    target: "node",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        globalObject: "typeof self !== 'undefined' ? self : this", // See https://github.com/webpack/webpack/issues/6522
        libraryTarget: "umd",
        filename: "lib-ts.js"
    }
}
