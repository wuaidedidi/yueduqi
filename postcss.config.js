/* eslint-env node */

module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1080, // 视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 2440, // 视窗的高度，对应的是我们设计稿的高度（也可以不配置）
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'rpx', // 指定需要转换成的视窗单位，建议使用`rpx`
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换`px`
    },
  },
}
