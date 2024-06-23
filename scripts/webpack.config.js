const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //번들링이 일어날 때 css파일을 별도의 파일로 호환하겠다.

module.exports = {
    entry: './src/index.tsx', // 확장자 수정
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'] // 올바른 확장자 목록
    },
  output: {
    path: path.resolve(__dirname, "dist"), // 현재 경로의 'dist' 폴더에 결과물 저장
    filename: "static/js/[name].[contenthash:8].js",
    clean: true, // 빌드 시 이전 내용 덮어쓰기
  },
  devtool: isProduction ? false : "eval-source-map", // 디버깅을 위한 소스 맵 설정
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    client: {
      overlay: true, // 코드 에러 시 화면에 오버레이로 표시
      progress: true, // 진행 상황 표시
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
    // Plugins -> plugins로 수정
    isProduction
      ? new HtmlWebpackPlugin({
          template: "public/index.html",
          minify: true,
        })
      : new HtmlWebpackPlugin({
          template: "public/index.html",
        }),
    isProduction
      ? new MiniCssExtractPlugin({
          linkType: false,
          filename: "[name].[contenthash:8].css",
        })
      : undefined,
  ].filter(Boolean),
};
