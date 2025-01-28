const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
	  {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets", // output path for assets
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            iesafe: true,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { test: /\.ts?$/, loader: "ts-loader" },
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [
          {
            loader: "lit-scss-loader",
            options: {
              minify: true, // defaults to false
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      hash: true,
    }),
  ],
  resolve: {
    extensions: [".es6", ".js", ".ts", ".lit.ts"],
    modules: ["node_modules"],
    alias: {
      "@": path.resolve(__dirname, "./src"), // ./ 경로를 @으로 설정
      Images: path.resolve(__dirname, "./images"),
    },
  },

  devtool: "source-map",

  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    client: {
      overlay: false
    }
  },
};
