module.exports = {
    entry: "./src/index.ts",
    mode: "production",
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
        filename: 'lib-external.js'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: ['src', 'node_modules']
    }
}
