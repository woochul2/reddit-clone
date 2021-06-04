// https://itnext.io/how-to-build-a-serverless-apollo-graphql-server-with-aws-lambda-webpack-and-typescript-64a377739208
const nodeExternals = require('webpack-node-externals');
const serverlessWebpack = require('serverless-webpack');

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  entry: serverlessWebpack.lib.entries,
  mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  node: false,
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
};
