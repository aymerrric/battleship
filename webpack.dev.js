const common = require("./webpack.common");
const merge = require("merge");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./template.html"]
    }
});
