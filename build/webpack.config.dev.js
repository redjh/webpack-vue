// 开发环境的配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { resolve } = require('path');

module.exports = {
  entry: [resolve(__dirname, '../src/index.js'), resolve(__dirname, '../public/index.html')],
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // 处理less
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // 处理css图片资源
      {
        test: /\.(jpg|png|gif)$/i,
        loader: 'url-loader',
        options: {
          // 8k以下的图片会被base64处理
          // 优点：减少网络请求，减少服务器压力
          // 缺点：图片体积会变大，文件请求会变慢
          limit: 8 * 1024,
          name: '[name].[hash:10].[ext]',
          // 默认使用es6模块解析，html-loader采用commonjs模块化，所以需要关闭es6模块化
          // 解析时会出问题: [object Module]
          // 解决办法：关闭url-loader es6模块，使用commonjs解析
          esModule: false,
        },
      },
      // 处理html图片资源，默认使用CommonJS导入
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // 处理其它资源,例如字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
      // 处理.vue 文件
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    // 指定html模板
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html'),
    }),
    // 处理vue文件
    new VueLoaderPlugin(),
    // 检查JS语法
    // new ESLintPlugin({
    //   fix: true,
    //   extensions: ['js', 'vue'],
    // }),
  ],
  // 开发工具
  devtool: 'source-map',

  devServer: {
    open: true,
    compress: true,
    hot: true,
  },
  resolve: {
    // 定义别名
    alias: {
      '@': resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.vue'],
  },
};
