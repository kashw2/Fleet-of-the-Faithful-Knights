module.exports = {
    entry: "./src/index.ts",
    devtool: "source-map",
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
        libraryTarget: "umd",
        filename: "lib-server.js"
    }
}
