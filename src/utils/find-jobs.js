const bostonScientific = require('../companies/boston-scientific')
const medtronic = require('../companies/medtronic')
const getBrowser = require('./get-browser')

module.exports = async () => {
  const browser = await getBrowser()
  const page = await browser.newPage()

  console.log('Finding jobs...')
  const bostonScientificJobs = await scrapeJobs(bostonScientific(page))
  const medtronicJobs = await scrapeJobs(medtronic(page))
  await browser.close()

  return [...bostonScientificJobs, ...medtronicJobs]
}

async function scrapeJobs({
  gotoFirstPage,
  getLastPageNumber,
  scrapeJobDetails,
  gotoNextPage,
}) {
  await gotoFirstPage()
  const lastPageNumber = await getLastPageNumber()

  async function scrapeJobs(aggregatedJobs = [], currentPageNumber = 1) {
    const jobs = await scrapeJobDetails()

    if (currentPageNumber >= lastPageNumber) {
      return [...aggregatedJobs, ...jobs]
    }

    await gotoNextPage(currentPageNumber)
    return scrapeJobs([...aggregatedJobs, ...jobs], currentPageNumber + 1)
  }

  return scrapeJobs()
}
