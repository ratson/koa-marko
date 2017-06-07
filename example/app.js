'use strict'

const Koa = require('koa')

const marko = require('../lib')

const template = require('./template.marko')

const app = new Koa()
app.use(marko())
app.use(({ render }) => {
  render(template, { title: 'Hello World!' })
})

module.exports = app

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server started on port 3000') // eslint-disable-line no-console
  })
}
