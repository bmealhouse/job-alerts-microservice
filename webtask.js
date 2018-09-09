const fetch = require('node-fetch')

module.exports = async function(context, cb) {
  const options = {
    method: 'POST',
    headers: {
      'JOB-ALERTS-AUTH-TOKEN': context.secrets.JOB_ALERTS_AUTH_TOKEN,
    },
  }

  try {
    const res = await fetch(context.secrets.JOB_ALERTS_ENDPOINT, options)
    if (res.status >= 400) {
      console.log(`${res.status}: ${res.statusText}`)
    }
  } catch (err) {
    console.log(`Error: ${err}`)
  }

  cb(null)
}
