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
    entry: './src/app.js',
    devtool: 'inline-source-map',//指向错误代码
    output: {
        path: path.resolve("", '/dist'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css|less$/,
                exclude: /^node_modules$/,
                use: [
                    MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
                    'css-loader'
                ]
            },
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            filename: 'index.html',
            template: './template/index.html'
         }),
        new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),// 开启全局的模块热替换(HMR)
        new webpack.NamedModulesPlugin(),// 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    ]
};

