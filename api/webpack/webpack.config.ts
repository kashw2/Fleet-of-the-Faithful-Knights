module.exports = {
    entry: "./app.ts",
    mode: "production",
    devtool: "source-map",
    target: "node",
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,
        __filename: false,
    },
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
        filename: "api.js"
    }
}
