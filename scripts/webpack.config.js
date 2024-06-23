const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/index.jsx',
    resolve: {
        extensions: ['.js', '.jsx'] // 번들링에 사용될 파일 확장자 설정
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 현재 경로의 'dist' 폴더에 결과물 저장
        filename: 'static/js/[name].[contenthash:8].js',
        clean: true // 빌드 시 이전 내용 덮어쓰기
    },
    devtool: isProduction ? false : 'eval-source-map', // 디버깅을 위한 소스 맵 설정
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        client: {
            overlay: true, // 코드 에러 시 화면에 오버레이로 표시
            progress: true // 진행 상황 표시
        }
    },
    module: {
        rules: [
            {
                oneOf: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }]
            }
        ]
    },
    plugins: [ // Plugins -> plugins로 수정
        isProduction ? 
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            minify: true
        }) :
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        })
    ]
};
