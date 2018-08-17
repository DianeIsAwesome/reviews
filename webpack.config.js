const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'babel-loader'
      //     },
      //     {
      //       loader: 'react-svg-loader',
      //       options: {
      //         jsx: true // true outputs JSX tags
      //       }
      //     }
      //   ]
      // }
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devtool: 'source-map',
};