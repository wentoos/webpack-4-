const os = require('os');
const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
const OpenBrowserPlugin = require('open-browser-webpack-plugin');//自动打开浏览器
const HappyPack = require('happypack');// 多线程操作
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

module.exports = {
    entry: './src/app.tsx',

    vendors: [
        'react', 'react-dom', '@types/react-dom', "@types/react", 'react-router', 'react-redux', 'redux', 'redux-thunk', 'react-transition-group', 'prop-types', 'swiper', 'fastclick',
    ],
    devtool: 'inline-source-map',//指向错误代码
    output: {
        path: path.resolve("", '/dist'),
        filename: 'js/bundle.[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].min.js',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".less", ".json"]
    },
    optimization: {
        splitChunks: {
            name: 'vendors',
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                exclude: /^node_modules$/,
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片(只能是相对路径图片编码background:url(../img/file.png))
                use: ['url-loader?limit=8192&name=img/[hash:8].[name].[ext]']
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                use: ['file-loader?name=[name].[ext]']
            },
            {
                test: /\.svg/,
                loader: 'svg-url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader!ts-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './template/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
            chunkFilename: "[id].[hash:8].css"
        }),
        new webpack.HotModuleReplacementPlugin(),// 开启全局的模块热替换(HMR)
        new webpack.NamedModulesPlugin(),// 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        new OpenBrowserPlugin({
            //自动打开浏览器
            url: 'http://localhost:8000/',
            browser: 'chrome'
        }),
    ]
};

