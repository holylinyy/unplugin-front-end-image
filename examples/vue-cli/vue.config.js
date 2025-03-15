const { defineConfig } = require('@vue/cli-service')
const FrontendImage = require('unplugin-front-end-image/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      FrontendImage({ env: 'zh-CN' }),
    ],
  },
})
