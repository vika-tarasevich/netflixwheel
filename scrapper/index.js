const puppeteer = require('puppeteer')
const fs = require('fs');

const { 
  LOGIN_SELECTOR, 
  PASSWORD_SELECTOR, 
  LOGIN_BUTTON_SELECTOR,
  PRIMARY_PROFILE_LINK_SELECTOR,
  PROFILES_GATE_CONTAINER_SELECTOR
} = require('./selectors.json');

const {
  LOGIN_LINK,
  AUDIO_LINK
} = require('./constants.json')

const runScrapper = async() => {
  const browser = await puppeteer.launch({headless: false,
    ignoreHTTPSErrors: true,
    args:[
        '--enable-features=NetworkService',
        '--no-sandbox',
    ] });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });

  await login(page);
  await choosePrimaryProfile(page);
  await goToAudioPage(page);
  await changeLanguage(page);

  await autoScroll(page);
  const items = await page.evaluate(extractItems)

  fs.writeFileSync('items.txt', items.join('\n') + '\n');
  console.log('done');
  await browser.close();
}


const changeLanguage = async (page) => {
  await page.click('.languageDropDown');
  await page.click('.languageDropDown > div > div.sub-menu.theme-lakira > ul > li:nth-child(2) > a');
  await page.waitFor(5000);
}

function extractItems() {
  const extractedElements = document.querySelectorAll('.rowContainer_title_card');
  const items = [];
  for (let element of extractedElements) {
    items.push(element.innerText);
  }
  return items;
}

const autoScroll = async (page) =>{
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
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

  const isProfilesGate = await page.evaluate((selector) => { 
    const elements = document.getElementsByClassName(selector);
    return !!elements.length;
  },PROFILES_GATE_CONTAINER_SELECTOR);

  if(isProfilesGate){
    await page.click(PRIMARY_PROFILE_LINK_SELECTOR);
  }
}

const goToAudioPage = async (page) => {
  await page.goto(AUDIO_LINK, { waitUntil: 'networkidle0' });
}

module.exports = {
  runScrapper
}



