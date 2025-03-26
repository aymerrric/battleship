const path = require("path");
const HtmlPlugins = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        clean: true
    },
    plugins: [new HtmlPlugins({ template: "./src/template.html" })],
    module: {
        rules: [
            {
                test: /\.css/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.html/i,
                loader: "html-loader"
            },
            {
                test: /\.(jpeg|png|svg)/,
                type: "resource/asset"
            }
        ]
    }
};
