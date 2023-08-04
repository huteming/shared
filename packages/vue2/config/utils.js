const path = require('path')

exports.resolve = function resolve(...args) {
  return path.resolve(__dirname, '..', ...args)
}
