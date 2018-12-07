const micro = require('micro')
const handler = require('./src')
const getBrowser = require('./src/utils/get-browser')

if (process.env.NODE_ENV === 'development') {
  module.exports = handler
} else {
  // pre-emptively launch chrome once the http server is up
  micro(handler).listen(3000, getBrowser)
}
