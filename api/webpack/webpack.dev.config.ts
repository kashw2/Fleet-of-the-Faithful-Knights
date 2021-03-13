module.exports = {
    entry: "./src/app.ts",
    mode: "development",
    devtool: "source-map",
    target: "node",
    watch: true,
    externals: [
        {
            'express': {
                commonjs: 'express',
                commonjs2: 'express'
            }
        }
    ],
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
        filename: 'api.js'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: ['src', 'node_modules']
    }
}
