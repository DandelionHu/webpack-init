const path = require('path') //引用node path
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html文件
const webpack = require('webpack');
const { CleanWebpackPlugin }=require('clean-webpack-plugin') //清除打包的文件
const CopyWebpackPlugin=require('copy-webpack-plugin') //拷贝文件
const MiniCssExtractPlugin=require('mini-css-extract-plugin') //头部link引入css
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin=require('terser-webpack-plugin')

// console.log(path.resolve())
// E:\gitcode\LPGSynthesizeManage-vue\webpack-init
// console.log(path.join(__dirname,'./dist'))
// E:\gitcode\LPGSynthesizeManage-vue\webpack-init\dist


const config = {
  //development 开发环境  production 正式环境，打包时会处理代码混淆压缩
  mode: 'development',
  //入口文件
  entry: './src/index.js',
  //输出
  output:{
    filename:'app.js',//输出文件名
    path:path.join(__dirname,'./dist') //输出路径
  },
  //loader规则
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader'] //一组链式的 loader 将按照相反的顺序执行
      },
      {
        test:/\.(styl|stylus)$/,
        use:['style-loader','css-loader','stylus-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        loader:'babel-loader'
      },
    ]
  },
  devServer: {
     contentBase: './dist',//对应文件目录
     hot: true //开启热更新
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename:'app.html',//生成的html名称
        template:'index.html' //使用的模板
      }),
      new webpack.HotModuleReplacementPlugin(),//热更新
      new CleanWebpackPlugin(),//清除文件
      //把assets文件夹下面的内容做拷贝
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname,'assets'),
            to: 'assets'
          }
        ],
      }),
      //生成link引入的css文件
      new MiniCssExtractPlugin({
        filename:'[name].css',
        chunkFilenameL:'[id].css'
      })
  ],
  //压缩js css
  optimization:{
    minimizer:[new TerserWebpackPlugin({}),new OptimizeCssAssetsWebpackPlugin({})]
  }
}

module.exports = config