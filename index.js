const http = require('http');

const scrapper = require('./scrapper')

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
   
  await scrapper.runScrapper();
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});