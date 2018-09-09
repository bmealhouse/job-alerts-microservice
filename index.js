const micro = require('micro')
const handler = require('./src')
const getBrowser = require('./src/utils/get-browser')

// pre-emptively launch chrome once the http server is up
micro(handler).listen(3000, getBrowser)
