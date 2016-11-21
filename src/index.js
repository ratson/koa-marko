import {install} from 'marko/node-require'
import middleware from './middleware'

install()

if (__DEV__) {
  require('marko/hot-reload').enable()
}

export default middleware
