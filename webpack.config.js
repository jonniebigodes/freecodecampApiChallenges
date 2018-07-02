const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path= require('path');
const webpack= require('webpack');

module.exports = {
  entry:"./src/index.js",
  output:{
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath:'/'
  },
  devtool: 'inline-source-map',
  devServer:{
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    inline: true,
    compress:true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use:{
          loader: "babel-loader"
        },
        exclude: /node_modules/ 
      },
      {
        test:/\.html$/,
        use:
          [
            {
              loader:"html-loader",
              options: { minimize: true }
            }
          ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test:/\.scss$/,
        use:[
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin(
      {
        template:'./src/template/index.html',
        filename:'./index.html'
      }
    ),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }) 
  ]
};