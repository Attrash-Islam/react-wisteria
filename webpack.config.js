module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      libraryTarget: 'umd'
    },
    externals : [
      'lodash/identity',
      'lodash/fp/set',
      'lodash/fp/update',
      'lodash/fp/isFunction',
      'lodash/fp/sortBy',
      {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
      }
    ],
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    }
};
