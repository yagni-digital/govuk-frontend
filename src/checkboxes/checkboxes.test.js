/**
 * @jest-environment ./lib/puppeteer/environment.js
 */
/* eslint-env jest */

const cheerio = require('cheerio')

const configPaths = require('../../config/paths.json')
const PORT = configPaths.ports.test

let browser
let page
let baseUrl = 'http://localhost:' + PORT

const goToAndGetComponent = async (name, example) => {
  const componentPath = `${baseUrl}/components/${name}/${example}/preview`
  await page.goto(componentPath, { waitUntil: 'load' })
  const html = await page.evaluate(() => document.body.innerHTML)
  const $ = cheerio.load(html)
  return $
}

const waitForHiddenSelector = async (selector) => {
  return page.waitForSelector(selector, {
    hidden: true,
    timeout: 1000
  })
}

const waitForVisibleSelector = async (selector) => {
  return page.waitForSelector(selector, {
    visible: true,
    timeout: 1000
  })
}

beforeEach(async () => {
  browser = global.__BROWSER__
  page = await browser.newPage()
})

afterEach(async () => {
  await page.close()
})

describe('Checkboxes with conditional reveals', () => {
  describe('when JavaScript is unavailable or fails', () => {
    it('has no ARIA attributes applied', async () => {
      await page.setJavaScriptEnabled(false)

      const $ = await goToAndGetComponent('checkboxes', 'with-conditional')
      const $component = $('.govuk-checkboxes')

      const hasAriaHidden = $component.find('.govuk-checkboxes__conditional[aria-hidden]').length
      const hasAriaExpanded = $component.find('.govuk-checkboxes__input[aria-expanded]').length
      const hasAriaControls = $component.find('.govuk-checkboxes__input[aria-controls]').length

      expect(hasAriaHidden).toBeFalsy()
      expect(hasAriaExpanded).toBeFalsy()
      expect(hasAriaControls).toBeFalsy()
    })
    it('falls back to making all conditional content visible', async () => {
      await page.setJavaScriptEnabled(false)

      await goToAndGetComponent('checkboxes', 'with-conditional')

      const isContentVisible = await waitForVisibleSelector('.govuk-checkboxes__conditional')
      expect(isContentVisible).toBeTruthy()
    })
  })
  describe('when JavaScript is available', () => {
    it('has conditional content revealed that is associated with a checked input', async () => {
      const $ = await goToAndGetComponent('checkboxes', 'with-conditional-checked')
      const $component = $('.govuk-checkboxes')
      const $checkedInput = $component.find('.govuk-checkboxes__input:checked')
      const inputAriaControls = $checkedInput.attr('aria-controls')

      const isContentVisible = await waitForVisibleSelector(`[aria-hidden=false][id="${inputAriaControls}"]`)
      expect(isContentVisible).toBeTruthy()
    })
    it('has no conditional content revealed that is associated with an unchecked input', async () => {
      const $ = await goToAndGetComponent('checkboxes', 'with-conditional-checked')
      const $component = $('.govuk-checkboxes')
      const $firstInput = $component.find('.govuk-checkboxes__item:first-child .govuk-checkboxes__input')
      const firstInputAriaControls = $firstInput.attr('aria-controls')

      const isContentHidden = await waitForHiddenSelector(`[aria-hidden=true][id="${firstInputAriaControls}"]`)
      expect(isContentHidden).toBeTruthy()
    })
    it('indicates when conditional content is collapsed or revealed', async () => {
      await goToAndGetComponent('checkboxes', 'with-conditional')

      const isNotExpanded = await waitForVisibleSelector('.govuk-checkboxes__item:first-child .govuk-checkboxes__input[aria-expanded=false]')
      expect(isNotExpanded).toBeTruthy()

      await page.click('.govuk-checkboxes__item:first-child .govuk-checkboxes__input')

      const isExpanded = await waitForVisibleSelector('.govuk-checkboxes__item:first-child .govuk-checkboxes__input[aria-expanded=true]')
      expect(isExpanded).toBeTruthy()
    })
    it('toggles the conditional content when clicking an input', async () => {
      const $ = await goToAndGetComponent('checkboxes', 'with-conditional')
      const $component = $('.govuk-checkboxes')
      const $firstInput = $component.find('.govuk-checkboxes__item:first-child .govuk-checkboxes__input')
      const firstInputAriaControls = $firstInput.attr('aria-controls')

      await page.click('.govuk-checkboxes__item:first-child .govuk-checkboxes__input')

      const isContentVisible = await waitForVisibleSelector(`[id="${firstInputAriaControls}"]`)
      expect(isContentVisible).toBeTruthy()

      await page.click('.govuk-checkboxes__item:first-child .govuk-checkboxes__input')

      const isContentHidden = await waitForHiddenSelector(`[id="${firstInputAriaControls}"]`)
      expect(isContentHidden).toBeTruthy()
    })
    it('toggles the conditional content when using an input with a keyboard', async () => {
      const $ = await goToAndGetComponent('checkboxes', 'with-conditional')
      const $component = $('.govuk-checkboxes')
      const $firstInput = $component.find('.govuk-checkboxes__item:first-child .govuk-checkboxes__input')
      const firstInputAriaControls = $firstInput.attr('aria-controls')

      await page.focus('.govuk-checkboxes__item:first-child .govuk-checkboxes__input')
      await page.keyboard.press('Space')

      const isContentVisible = await waitForVisibleSelector(`[id="${firstInputAriaControls}"]`)
      expect(isContentVisible).toBeTruthy()

      await page.keyboard.press('Space')

      const isContentHidden = await waitForHiddenSelector(`[id="${firstInputAriaControls}"]`)
      expect(isContentHidden).toBeTruthy()
    })
  })
})
