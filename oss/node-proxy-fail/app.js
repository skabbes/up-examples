const http = require('http')
const url = require('url');
const { PORT = 3000 } = process.env

http.createServer((req, res) => {
  const parts = url.parse(req.url, true);

  let delay = 0, id = 0;

  if (parts.pathname === '/delay') {
    const { t = 0, id = 0 } = parts.query;
    setTimeout(() => {
      res.end(JSON.stringify(parts.query));
    }, t * 1000);
    return;
  }


  res.writeHead(400);
  res.end('bad request');
}).listen(PORT)
