'use strict'

const { defaultOptions } = 'marko/compiler'

module.exports = (
  {
    renderMethod = 'render',
    watchPaths = '**/*.marko',
    watchOptions = { ignored: /node_modules/ },
    compilerOptions,
  } = {}
) => {
  if (compilerOptions) {
    Object.assign(defaultOptions, compilerOptions)
  }
  if (process.env.NODE_ENV !== 'production' && watchPaths) {
    const hotReload = require('marko/hot-reload')
    const path = require('path')
    const chokidar = require('chokidar')
    chokidar.watch(watchPaths, watchOptions).on('all', (event, filename) => {
      const templatePath = path.resolve(filename)
      hotReload.handleFileModified(templatePath)
    })
  }

  return (ctx, next) => {
    if (ctx[renderMethod]) {
      return next()
    }

    ctx[renderMethod] = (template, locals = {}) => {
      const state = Object.assign(locals, ctx.state || {})

      ctx.type = 'text/html'
      ctx.body = template.stream(state)
    }
    return next()
  }
}
