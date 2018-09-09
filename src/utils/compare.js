module.exports = (jobs, databaseJobs) => {
  console.log('Comparing jobs to database...')
  const jobsMap = new Map(jobs.map(job => [job.href, job]))
  databaseJobs.forEach(({href}) => jobsMap.delete(href))
  return [...jobsMap.values()]
}
