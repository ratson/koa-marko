'use strict'

module.exports = ({
  renderMethod = 'render',
  watchPaths = '**/*.marko',
  watchOptions = { ignored: /node_modules/ },
  compilerOptions,
  debug = false,
} = {}) => {
  if (compilerOptions) {
    require('marko/compiler').configure(compilerOptions)
  }
  if (watchPaths && process.env.NODE_ENV !== 'production') {
    try {
      const chokidar = require('chokidar')
      const hotReload = require('marko/hot-reload')
      const path = require('path')
      chokidar.watch(watchPaths, watchOptions).on('all', (event, filename) => {
        const templatePath = path.resolve(filename)
        hotReload.handleFileModified(templatePath)
      })
    } catch (error) {
      if (debug) {
        console.error(error)
      }
    }
  }

  return (ctx, next) => {
    if (ctx[renderMethod]) {
      return next()
    }

    ctx[renderMethod] = (template, locals = {}) => {
      const state = Object.assign({}, ctx.state, locals)

      ctx.type = 'text/html'
      ctx.body = template.stream(state)
    }
    return next()
  }
}
