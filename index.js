const http = require('http');
const puppeteer = require('puppeteer')

const scrapper = require('./scrapper')

const hostname = '127.0.0.1';
const port = 3000;


async function getPic() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
   

    await scrapper.login(page);
    await scrapper.choosePrimaryProfile(page);
  
    await browser.close();
  }


const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
   
  getPic();
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});