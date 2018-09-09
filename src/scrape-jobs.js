export default async ({
  gotoFirstPage,
  getLastPageNumber,
  scrapeJobDetails,
  gotoNextPage,
}) => {
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
