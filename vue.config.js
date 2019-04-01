'use strict'

const CompressionPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: "./dist",
    configureWebpack: config => {
        if (isProduction) {
            config.plugins.push(new CompressionPlugin({
                algorithm:'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
            config.externals = {
                vue: "Vue",
                axios: 'axios',
                // 这个地方如果和mian.js一起改为elementUI这种小写的，就会报错找不到，原因未知
                "element-ui": "ELEMENT"
            }
        }
    },
    devServer: {
        proxy: {
            '^/api':{
                target:'http://localhost:3001/api/',
                changeOrigin: true,
                pathRewrite:{
                  '/api':''
                }
            }
        }
    },

    assetsDir: 'static',

    indexPath: 'index.ejs',

    // pages: {
    //     index:{
    //         entry:'src/main.js',
    //         template: "public/index-prod.html",
    //         filename:'index.ejs',
    //         chunks: ["chunk-vendors", "chunk-common", "index"]
    //     }
    // },
}