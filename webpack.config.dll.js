const path    = require('path');
const webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
//const nodeEnv = process.env.NODE_ENV || 'development';
const commont = [
  'react',
  'react-dom',
  'react-router',
  'mobx',
  'mobx-react',
  'react-bootstrap',
  'classnames',
  'antd',
  //'echarts'
]

module.exports = {
  // devtool: '#eval-source-map',
  entry: {
      vendor: commont
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      comments: false,
      output: {
        comments: false    // remove all comments
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify('production'),  //'"production"'
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(['dll'],{
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', 'manifest.json'),
      name: '[name]',
      context: __dirname
    })
  ]
};
