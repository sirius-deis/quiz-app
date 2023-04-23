const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /m?\.js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
            filename: "index.html",
            title: "Quiz app",
            inject: "body",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets"),
                    to: "public",
                },
                {
                    from: path.resolve(__dirname, "src", "favicon.ico"),
                    to: ".",
                },
                {
                    from: path.resolve(__dirname, "src", "manifest.json"),
                    to: ".",
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        client: {
            progress: true,
            overlay: true,
        },
        hot: true,
        historyApiFallback: true,
        compress: true,
        port: 3002,
        open: false,
    },
};
