const http = require('http')
const url = require('url');
const { PORT = 3000, UP_RESTARTS } = process.env
let r = parseInt(UP_RESTARTS, 10);

http.createServer((req, res) => {
  const myR = r++;
  r++;
  const parts = url.parse(req.url, true);

  let delay = 0, id = 0;

  if (parts.pathname === '/delay') {
    const { t = 0, id = 0 } = parts.query;
    setTimeout(() => {
      if (myR % 3 == 0) {
        res.writeHead(500);
        res.end(JSON.stringify(parts.query));
        return;
      }

      res.end(JSON.stringify(parts.query));
    }, t * 1000);
    return;
  }


  res.writeHead(400);
  res.end('bad request');
}).listen(PORT)
