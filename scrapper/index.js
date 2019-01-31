const puppeteer = require('puppeteer')

const { 
  LOGIN_SELECTOR, 
  PASSWORD_SELECTOR, 
  LOGIN_BUTTON_SELECTOR,
  PRIMARY_PROFILE_LINK_SELECTOR
} = require('./selectors.json');

const {
  LOGIN_LINK,
  AUDIO_LINK
} = require('./constants.json')

const runScrapper = async() => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });

  await login(page);
  await choosePrimaryProfile(page);
  await browser.close();
}

const login = async (page) => {
  await page.goto(LOGIN_LINK);

  await page.click(LOGIN_SELECTOR);
  await page.keyboard.type(process.env.LOGIN);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(process.env.PASSWORD);

  await page.click(LOGIN_BUTTON_SELECTOR);
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
}

const choosePrimaryProfile = async (page) => {
  await page.click(PRIMARY_PROFILE_LINK_SELECTOR);
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' })

  await page.goto(AUDIO_LINK);

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
}

module.exports = {
  runScrapper
}



