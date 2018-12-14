const nock = require('nock')
const webtask = require('./webtask')

const JOB_ALERTS_ENDPOINT = 'https://fakeendpoint-qzzjpqsxyy.now.sh'

const getContext = () => ({
  secrets: {
    JOB_ALERTS_AUTH_TOKEN: 'secret',
    JOB_ALERTS_ENDPOINT,
  },
})

test('500: internal server error', done => {
  nock(JOB_ALERTS_ENDPOINT)
    .post('/')
    .replyWithError('ERROR')

  const context = getContext()
  webtask(context, done)
})

test('400: bad request', done => {
  nock(JOB_ALERTS_ENDPOINT)
    .post('/')
    .reply(400)

  const context = getContext()
  webtask(context, done)
})

test('200: success', done => {
  nock(JOB_ALERTS_ENDPOINT)
    .post('/')
    .reply(200)

  const context = getContext()
  webtask(context, done)
})
