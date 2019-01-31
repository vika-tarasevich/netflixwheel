
const { 
  LOGIN_SELECTOR, 
  PASSWORD_SELECTOR, 
  LOGIN_BUTTON_SELECTOR,
  PRIMARY_PROFILE_LINK_SELECTOR
} = require('./selectors.json');

const login = async (page) => {
  await page.goto('https://www.netflix.com/by/login');

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

  await page.goto('https://www.netflix.com/browse/audio');

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
}



module.exports = {
  login,
  choosePrimaryProfile
}



