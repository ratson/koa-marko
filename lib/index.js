'use strict'

const { install } = require('marko/node-require')
const middleware = require('./middleware')

install()

if (process.env.NODE_ENV !== 'production') {
  require('marko/hot-reload').enable()
}

module.exports = middleware
