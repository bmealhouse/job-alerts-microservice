const {GraphQLClient} = require('graphql-request')

const client = new GraphQLClient(process.env.PRISMA_SERVER_ENDPOINT)

module.exports = {
  async readJobs() {
    const {jobs} = await client.request(readJobsQuery())
    return jobs
  },
  async createJobs(newJobs) {
    console.log('Adding new jobs to database...')
    const mutations = newJobs.map(createJobMutation)
    await client.request(createJobsQuery(mutations))
  },
}

function readJobsQuery() {
  return `
  {
    jobs {
      href
    }
  }
  `
}

function createJobsQuery(mutations) {
  return `
  mutation createJobs {
    ${mutations.join('\n')}
  }
  `
}

function createJobMutation({company, title, location, href}) {
  const alias = `alias_${Math.random()
    .toString(36)
    .slice(2)}`

  return `
    ${alias}: createJob(
      data: {
        company: "${company}"
        href: "${href}"
        location: "${location}"
        title: "${title}"
      }
    ) {
      id
    }
  `
}
