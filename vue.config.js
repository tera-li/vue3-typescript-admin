const { resolve } = require('path')
const path = require('path')
const WebpackBar = require('webpackbar')
const dayjs = require('dayjs')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
const TerserPlugin = require('terser-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
process.env.VUE_APP_UPDATE_TIME = time
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  devPort
} = require('./src/config/default/vue.custom.config')
module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  /**
   * 解决 vue-i18n 警告
   * You are running the esm-bundler build of vue-i18n.
   * It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
   * */
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve(''),
          Assets: resolve('src/assets'),
          'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
        }
      },
      module: {
        rules: [
          {
            test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
            loader: '@intlify/vue-i18n-loader',
            include: [
              // Use `Rule.include` to specify the files of locale messages to be pre-compiled
              path.resolve(__dirname, 'src/lang')
            ]
          }
        ]
      },
      plugins: [
        new WebpackBar({
          name: title
        }),
        new HardSourceWebpackPlugin()
      ]
    }
  },
  // 配置
  chainWebpack: (config) => {
    // 返回一个将会被合并的对象
    if (process.env.NODE_ENV === 'production') {
      return {
        optimization: {
          minimizer: [
            // 多进程打包优化
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                output: {
                  comments: false
                },
                compress: {
                  drop_console: true,
                  warnings: false,
                  drop_debugger: true
                }
              }
            })
          ]
        }
      }
    }
  }
}
