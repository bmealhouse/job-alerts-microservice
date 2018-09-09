const {createError} = require('micro')

const TOKEN_KEY = 'job-alerts-auth-token'

module.exports = req => {
  if (req.headers[TOKEN_KEY] !== process.env.JOB_ALERTS_AUTH_TOKEN) {
    throw createError(403, 'Forbidden')
  }
}
