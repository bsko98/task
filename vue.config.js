const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../task_back/src/main/resources/static',
  devServer: {
    proxy: 'http://localhost:8080'
  }
})
