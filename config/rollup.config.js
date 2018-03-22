import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
// import uglify from 'rollup-plugin-uglify'
import pkg from '../package.json'

const configPaths = require('paths.json')

export default [
  // browser-friendly UMD build
  {
    input: configPaths + '**/**.js',
    output: {
      name: 'govukfrontend',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(), // so Rollup can find `govukfrontend`
      commonjs() // so Rollup can convert `govukfrontend` to an ES module
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/main.js',
    external: ['govukfrontend'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
]
