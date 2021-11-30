/**
 * vue config
 * @ref https://cli.vuejs.org/zh/config/
 */

const path = require('path');
const svgDir = 'src/assets/svg';

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    publicPath: '/os/lean-cloudteam-app/',
    devServer: {
        proxy: {
            '/permission': {
                target: 'http://10.20.5.21:38080/',
                changeOrigin: true
            },
            '/api': {
                // target: 'http://10.20.5.21:38080/',
                // 刘兴银本地
                // target: 'http://10.20.2.211:39110/',
                // 向连朋本地
                target: 'http://10.20.2.105:39111/',
                // target: 'http://10.20.2.186:39111/',
                logLevel: 'debug',
                changeOrigin: true,
                ws: true
            }
        }
    },

    transpileDependencies: [/@isyscore\//, '@isyscore/axios', '@isyscore/vue-plugin-acl'],

    chainWebpack: (config) => {
        config.module.rule('svg-sprite').use('svgo-loader').loader('svgo-loader');
    },

    pluginOptions: {
        svgSprite: {
            dir: svgDir,
            test: /\.svg$/,
            loaderOptions: {
                extract: false,
                symbolId: (file) =>
                    path
                        .relative(path.join(__dirname, svgDir), file)
                        .replace(/\\/g, '/')
                        .replace(/\.svg$/, '')
            },
            pluginOptions: {
                plainSprite: true
            }
        }
    }
};
