const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "../core"),
    output: {
        library: "core",
        filename: "core.js",
        libraryTarget: "umd",
        umdNamedDefine: true,
        globalObject: "typeof self !== \"undefined\" ? self : this",
        path: path.resolve(__dirname, "../core/dist")
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ["ts-loader"],
            },
        ],
    },
};
