import {GraphQLClient} from 'graphql-request'

const client = new GraphQLClient(process.env.PRISMA_SERVER_ENDPOINT)

export default {
  async read() {
    const {jobs} = await client.request(`
      {
        jobs {
          href
        }
      }
    `)

    return jobs
  },
  async update(newJobs) {
    const mutations = newJobs.map(createJob)
    await client.request(createJobs(mutations))
  },
}

function createJobs(mutations) {
  return `
  mutation createJobs {
    ${mutations.join('\n')}
  }
  `
}

function createJob({company, title, location, href}) {
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
