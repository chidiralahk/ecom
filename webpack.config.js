const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const port = 3000;
const cwd = __dirname;
const isProd = process.env.NODE_ENV === "production";
const mode = isProd ? "production" : "development";

const scrDir = path.join(cwd, "src");
const distDir = path.join(cwd, "dist");
const entry = path.join(cwd, "src", "index.jsx");

module.exports = {
  mode,
  entry,
  target: "web",
  devtool: "source-map",
  output: {
    path: distDir,
    filename: "app.js",
    publicPath: "/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.join(scrDir, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],

  resolve: {
    extensions: [".jsx", ".js", ".json", ".scss", ".css", "*"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, ///'ends with jsx or js
        include: [scrDir],
        // exclude: [path.resolve(cwd, "app/demo-files")],
        loader: "babel-loader",
      },
      {
        test: /\.s?css$/, ///'ends with scss or css
        include: [scrDir],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/, ///'ends with html
        include: [scrDir],
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    port,
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        pathRewrite: { "^/api": "" },
      },

      "/images": "http://localhost:3001",
    },
  },
};
