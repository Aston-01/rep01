module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  devServer:{
        https: false,
        open: true,
        proxy: {
            "/api": {
                target: 'http://panglei.vaiwan.com/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
  }
};
