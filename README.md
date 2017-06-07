# koa-marko

Marko template engine middleware for koa

## Installation

```
npm install koa-marko koa marko --save
```

## Usage

```js
const Koa = require('koa')
const marko = require('koa-marko')

const template = require('./template.marko')

const app = new Koa()

app.use(marko())
app.use((ctx) => {
  ctx.render(template)
})

app.listen(3000)
```
