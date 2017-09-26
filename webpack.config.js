module.exports = {
  context: __dirname + '/src',
  entry: {
    'entry': './main'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    library: 'World'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader', 
        options: {
            presets: [
                ['env', {'modules': false}]
            ]
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  node: {
      fs: 'empty'
  }
};