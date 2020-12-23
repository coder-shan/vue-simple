const path = require('path') // 引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
const webpack = require('webpack')

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [path.resolve(__dirname, "./src/style/less/common.less")]
        })
}
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
    },

    lintOnSave:false,
    devServer: {
        open: true,
        // 设置默认端口
        port: 8080,
        https: false,
        hot: true,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://192.168.100.110',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        overlay: {
            warnings: false,
            errors: false
        }
    }
}
