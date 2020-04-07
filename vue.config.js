module.exports = {
    lintOnSave: false,
    // lintOnSave: 'warning',
    devServer: {
        proxy: {
            '/api': {
                //只对 /api 开头路径的请求处理
                target: 'http://182.92.128.115',
                changeOrigin: true //支持跨域
            },
        }
    }
}