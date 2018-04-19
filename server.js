
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.dev");

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {

    publicPath: webpackConfig.output.publicPath,//服务器资源路径
    disableHostCheck: true,
    stats: {
        colors: true
    }
});

//将其他路由，全部返回index.html
server.app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');//dev version
    // res.sendFile(__dirname + '/assets/index.html');//live version
});

server.listen(8000);