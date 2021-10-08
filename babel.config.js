module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  env: {
    development: {
      // 按需加载
      plugins: [
        'dynamic-import-node'
        // [
        //   'component',
        //   {
        //     libraryName: 'element-plus',
        //     styleLibraryName: 'theme-chalk'
        //   }
        // ]
      ]
    }
  }
}
