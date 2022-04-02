//生产环境的配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');

const commonCSSLoader = [
  {
    // css提取为单独的文件
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
    },
  },
  'css-loader',
  {
    // 处理css兼容性，需要在package.json配置兼容的版本
    loader: 'postcss-loader',
    options: {
      indent: 'postcss',
      plugins: () => [require('postcss-preset-env')],
    },
  },
];

module.exports = {
  entry: resolve(__dirname, '../src/index.js'),
  output: {
    filename: 'js/[name].[contenthash].js',
    path: resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/i,
        use: [...commonCSSLoader],
      },
      // 处理less
      {
        test: /\.less$/i,
        use: [...commonCSSLoader, 'less-loader'],
      },
      // 处理css图片资源
      {
        test: /\.(jpg|png|gif)$/i,
        loader: 'url-loader',
        options: {
          //8k以下的图片会被base64处理
          //优点：减少网络请求，减少服务器压力
          //缺点：图片体积会变大，文件请求会变慢
          limit: 8 * 1024,
          name: '[name].[hash:10].[ext]',
          //默认使用es6模块解析，html-loader采用commonjs模块化，所以需要关闭es6模块化
          //解析时会出问题: [object Module]
          //解决办法：关闭url-loader es6模块，使用commonjs解析
          esModule: false,
          outputPath: 'images',
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
          path: 'media',
        },
      },
      // 处理.vue 文件
      {
        test: /\.vue$/i,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },
      // js 兼容性处理
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 开启babel缓存，第二次构建的速度会加快
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 清空构建目录
    new CleanWebpackPlugin([resolve(__dirname,'../dist')]),
    // 指定html模板
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html'),
      // 压缩html
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    // 处理vue文件
    new VueLoaderPlugin(),
    // 抽离css为单独的文件
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].css',
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin(),
    // 检查js语法
    new ESLintPlugin({
      fix: true,
      extensions: ['js', 'vue'],
    }),
  ],
  // devtool: 'source-map',
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    open: true,
    compress: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
  // 分离代码
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
