const config = require('./webpack.config.js');
const webpack = require('webpack');
const merge= require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports=merge(config,{
  mode:'production',
  devtool:'source-map',
  optimization:{
    minimize:true,
    minimizer:[
      new UglifyJsPlugin({
        uglifyOptions:{
          mangle:true,
          compress:true,
          ie8:false,
          warnings:false,
          
          
        }
      })
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ]
})
// config.plugins.push(
//   new webpack.DefinePlugin({
//     "process.env": {
//       "NODE_ENV": JSON.stringify("production")
//     }
//   })
// );

// config.plugins.push(
//   new webpack.optimize.UglifyJsPlugin({
//     sourceMap:true,
//     comments:false,
//     minimize:true,
//     mangle:true,
//     compress: {
//       warnings: false,
//       sequences: true,
//       dead_code: true,
//       conditionals: true,
//       booleans: true,
//       unused: true,
//       if_return: true,
//       join_vars: true,
//       drop_console: true,
//       screw_ie8: true, 
//     }
//   })
// );

// config.plugins.push(
//   new webpack.optimize.DedupePlugin()
// );
// module.exports = config;