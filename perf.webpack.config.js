const merge = require("webpack-merge");
const prod = require("./prod.webpack.config.js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

//Fichero para medir el rendimiento de nuestro bundle.

module.exports = merge(prod, {
    plugins: [new BundleAnalyzerPlugin()]
});