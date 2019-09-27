const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const outputDir = path.resolve(__dirname, 'dist');

module.exports = {
  mode: (isDevelopment) ? 'development' : undefined,
  entry: {
    index: './src/main.ts'
  },
  // output: {
  //   // your stuff
  //   publicPath: './src/assets/'
  // },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: outputDir,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }])
  ],
  devServer: {
    contentBase: outputDir,
    compress: true,
    inline: true,
    port: 8080,
    hot: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
};