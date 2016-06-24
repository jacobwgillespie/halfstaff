const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const postcss = require('postcss-import');
const precss = require('precss');
const webpack = require('webpack');

const DEV = !!process.env.DEV;

const styleLoaders = [
  `css-loader?${JSON.stringify({
    sourceMap: DEV,
    // CSS Modules https://github.com/css-modules/css-modules
    modules: true,
    localIdentName: DEV ? '[name]-[local]-[hash:base64:4]' : '[hash:base64:4]',
    // CSS Nano http://cssnano.co/options/
    minimize: !DEV,
  })}`,
  'postcss-loader?parser=postcss-scss',
  'sass-loader',
];

const baseConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
    root: path.resolve(__dirname),
  },

  debug: DEV,
  devtool: DEV ? 'cheap-source-map' : false,

  postcss: bundler => ([
    postcss({ addDependencyTo: bundler }),
    precss(),
    autoprefixer({ browsers: ['last 2 versions'] }),
  ]),
};

const assetsPluginInstance = new AssetsPlugin({ filename: 'dist/assets.json' });

const clientConfig = Object.assign({}, baseConfig, {
  entry: {
    app: 'src/client.js',
    polyfill: 'src/polyfill.js',
  },

  output: {
    path: 'dist',
    filename: DEV ? '[name].js' : '[name].[hash].js',
    chunkFilename: DEV ? '[name].js' : '[name].[hash].js',
    publicPath: '/',
  },

  module: {
    loaders: [
      {
        test: /\.async\.jsx?$/,
        loaders: ['promise-loader?global', 'babel-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.json$/,
        loader: 'json-loader',
      },

      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style-loader', styleLoaders.join('!')),
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      DEV,
      'process.env': {
        NODE_ENV: DEV ? '"development"' : '"production"',
      },
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin(DEV ? 'style.css' : 'style.[hash].css', { allChunks: true }),
    new FaviconsWebpackPlugin({
      logo: 'src/images/icon.png',
      emitStats: true,
      statsFilename: 'icons.json',
    }),
    assetsPluginInstance,
  ],
});

if (!DEV) {
  clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
  }));
}

const serverConfig = Object.assign({}, baseConfig, {
  entry: 'src/server.js',

  output: {
    path: 'dist',
    filename: 'server.js',
    libraryTarget: 'commonjs',
  },

  target: 'node',
  externals: [
    '../dist/assets.json',
    '../dist/icons.json',
    nodeExternals(),
  ],
  node: {
    __dirname: true,
  },

  module: {
    loaders: [
      {
        test: /\.async\.jsx?$/,
        loaders: ['promise-loader?global', 'babel-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.json$/,
        loader: 'json-loader',
      },

      {
        test: /\.s?css$/,
        loaders: ['isomorphic-style-loader'].concat(styleLoaders),
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      DEV,
      'process.env': {
        NODE_ENV: DEV ? '"development"' : '"production"',

        // preserve ASSET_HOST variable
        ASSET_HOST: 'process.env.ASSET_HOST',
      },
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
});

if (!DEV) {
  serverConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
  }));
}

module.exports = [clientConfig, serverConfig];
