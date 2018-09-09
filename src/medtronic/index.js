import {searchUrl, lastPageSelector, jobDetailsSelector} from './constants'

export default page => ({
  async gotoFirstPage() {
    await page.goto(`${searchUrl}/page1`)
  },
  async getLastPageNumber() {
    return Number(await page.$eval(lastPageSelector, el => el.dataset.page))
  },
  async scrapeJobDetails() {
    return page.$$eval(jobDetailsSelector, jobDetails => {
      const cleanText = text => text.replace(/\\n/g, '').trim()

      return jobDetails.map(row => {
        const {href, innerText: rawTitle} = row.querySelector('.job_link')
        const {innerText: rawLocation} = row.querySelector('.location')

        const company = 'Medtronic'
        const title = cleanText(rawTitle)
        const location = cleanText(rawLocation)

        return {company, title, location, href}
      })
    })
  },
  async gotoNextPage(currentPageNumber) {
    await page.goto(`${searchUrl}/page${currentPageNumber + 1}`)
  },
})
