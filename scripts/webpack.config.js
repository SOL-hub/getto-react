const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.tsx", // 파일 확장자 수정
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 파일 확장자 목록 수정
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 결과물이 생성될 디렉터리 경로 설정
    filename: "static/js/[name].[contenthash:8].js",
    clean: true, // 빌드 시 이전 결과물을 자동으로 삭제
  },
  devtool: isProduction ? false : "eval-source-map", // 개발 시 디버깅을 위한 소스 맵 설정
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    client: {
      overlay: true, // 에러 발생 시 브라우저 화면에 오버레이로 표시
      progress: true, // 빌드 진행 상황 표시
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader",
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    isProduction
      ? new HtmlWebpackPlugin({
          template: "public/index.html",
          minify: true,
        })
      : new HtmlWebpackPlugin({
          template: "public/index.html",
        }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[id].[contenthash:8].css",
      }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ].filter(Boolean),
};
