const common = require("./webpack.common");
const merge = require("merge");

module.exports = merge(common, {
  mode: "production",
});
