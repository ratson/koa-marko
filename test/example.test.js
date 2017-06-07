import test from 'ava'
import request from 'supertest'

import app from '../example/app'

test(async t => {
  await request(app.listen()).get('/').expect(/Hello World!/)
  t.pass()
})
