import puppeteer from 'puppeteer'
import scrapeJobs from './scrape-jobs'
import db from './db'
import sendJobAlert from './send-job-alert'
import bostonScientific from './boston-scientific'
import medtronic from './medtronic'

const main = async () => {
  const browser = await puppeteer.launch()

  try {
    const page = await browser.newPage()
    const bostonScientificJobs = await scrapeJobs(bostonScientific(page))
    const medtronicJobs = await scrapeJobs(medtronic(page))
    const jobs = [...bostonScientificJobs, ...medtronicJobs]

    const databaseJobs = await db.read()
    const jobsMap = new Map(jobs.map(job => [job.href, job]))
    databaseJobs.forEach(({href}) => jobsMap.delete(href))
    if (jobsMap.size === 0) return

    const newJobs = [...jobsMap.values()]
    await sendJobAlert(newJobs)
    // await db.update(newJobs)
  } catch (err) {
    console.log(err.toString())
  } finally {
    await browser.close()
  }
}

main()
