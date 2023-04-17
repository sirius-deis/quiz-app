const path = require("path");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
};
