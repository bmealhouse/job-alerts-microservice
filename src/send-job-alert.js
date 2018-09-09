import sendgrid from '@sendgrid/mail'
import mjml2html from 'mjml'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

export default async newJobs => {
  console.log('Sending email...')

  const data = newJobs.reduce((newJobsMap, job) => {
    const aggregatedJobs = newJobsMap[job.company] || []
    return {...newJobsMap, [job.company]: [...aggregatedJobs, job]}
  }, {})

  const emailMessage = {
    to: process.env.SENDGRID_TO.split(','),
    from: 'job-alert@brent.sh',
    subject: 'Job alert!',
    html: generateHtml(data),
  }

  try {
    await sendgrid.send(emailMessage)
  } catch (err) {
    console.error(err.toString())
  }
}

function generateHtml(data) {
  const jobDetailsMarkup = ({title, location, href}) => `
    <mj-section padding="7px 0 0 0" border-bottom="1px solid #ecedee">
      <mj-column>
        <mj-button href="${href}" color="#0074d9" font-size="14px" font-weight="900" text-decoration="underline" background-color="#fff" padding="0" align="left">${title}</mj-button>
        <mj-text color="#333" font-size="12px" font-style="italic" padding="0 0 20px 25px">${location}</mj-text>
      </mj-column>
    </mj-section>
  `

  const jobSectionsMarkup = Object.entries(data).map(
    ([company, jobDetails]) => `
      <mj-section padding="0" background-color="#333">
        <mj-column>
            <mj-text color="#fff" font-size="16px" font-weight="900">${company}</mj-text>
        </mj-column>
      </mj-section>
      ${jobDetails.map(jobDetailsMarkup).join('')}
    `,
  )

  const mjmlTemplate = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text color="#ff4136" font-size="40px" font-weight="900" align="left">Job alert!</mj-text>
      </mj-column>
    </mj-section>
    ${jobSectionsMarkup.join('')}
  </mj-body>
</mjml>
`

  const {html} = mjml2html(mjmlTemplate, {
    minify: true,
    validationLevel: 'strict',
  })

  return html
}
