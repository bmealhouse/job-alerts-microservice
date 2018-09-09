const microCors = require('micro-cors')
const post = require('micro-post')
const microSentry = require('micro-sentry')

const isTest = process.env.NODE_ENV === 'test'
const isProd = process.env.NODE_ENV === 'production'

module.exports = fn => {
  const cors = microCors({
    allowMethods: ['POST'],
    allowHeaders: ['Access-Control-Allow-Origin', 'Content-Type'],
    origin: isTest ? '*' : 'https://sandbox.auth0-extend.com',
  })

  if (isProd) {
    fn = microSentry(process.env.JOB_ALERTS_SENTRY_DSN)(fn)
  }

  return cors(post(fn))
}
