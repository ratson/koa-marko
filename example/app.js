import Koa from 'koa'
import marko from '../lib'

import template from './template.marko'

const app = new Koa()
app.use(marko())
app.use(({render}) => {
  render(template, {title: 'Hello World!'})
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
