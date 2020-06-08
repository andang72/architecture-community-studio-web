module.exports = {
    test: require.resolve('axios'),
    use: [{
        loader: 'expose-loader',
        options: 'axios'
    }]
  };