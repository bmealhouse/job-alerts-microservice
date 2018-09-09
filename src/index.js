const {send} = require('micro')
const validateRequest = require('./utils/validate-request')
const findJobs = require('./utils/find-jobs')
const compare = require('./utils/compare')
const sendEmailNotification = require('./utils/send-email-notification')
const middleware = require('./middleware')
const db = require('./db')

module.exports = middleware(async (req, res) => {
  validateRequest(req)

  const jobs = await findJobs()
  const newJobs = await compare(jobs, await db.readJobs())

  if (newJobs.length > 0) {
    await sendEmailNotification(newJobs)
    await db.createJobs(newJobs)
  }

  send(res, 204)
})
