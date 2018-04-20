const os = require('os');
const path = require('path');
const webpack = require('webpack')
const WebpackDevServer = require("webpack-dev-server");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
const OpenBrowserPlugin = require('open-browser-webpack-plugin');//自动打开浏览器
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HappyPack = require('happypack');// 多线程操作
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

const config = {
    entry: {
        app: './src/app.tsx',
        vendors: [
            'react', 'react-dom'
        ]
    },
    performance:{
        hints:false
    },
    devtool: 'inline-source-map',//指向错误代码
    output: {
        path: path.resolve("", '/dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].min.js',
        // publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".less", ".json"],
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "async",
                    minChunks: 2,
                    // automaticNameDelimiter: "-"
                }
            }
        },
        minimizer:[
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
        ]

    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.less$/,
                exclude: /^node_modules$/,
                use: [MiniCssExtractPlugin.loader, 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                exclude: /^node_modules$/,
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
        // new MinifyPlugin({}),
        new webpack.SourceMapDevToolPlugin({
            test: [".ts", ".tsx", ".js", ".css", ".less", ".json"],
            exclude: /^node_modules$/,
        }),
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

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
});

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');//dev version
    // res.sendFile(__dirname + '/assets/index.html');//live version
});

server.listen(8000);