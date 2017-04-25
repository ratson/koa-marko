# koa-marko

Marko template engine middleware for koa

## Installation

```
npm install koa-marko koa marko --save
```

## Usage

```js
import Koa from 'koa'
import marko from 'koa-marko'

import template from './template.marko'

const app = new Koa()

app.use(marko())
app.use((ctx) => {
  ctx.render(template)
})

app.listen(3000)
```
