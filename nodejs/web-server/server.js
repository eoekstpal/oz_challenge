const http = require('http');
const port = 4000;
const targetObject = {a: 'a', b: 'b'};

const serer = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/home') {
    req.on('data', (data) => {
      console.log('data', data);
      const stringfiedData = data.toString();
      console.log('stringfiedData', stringfiedData);
      Object.assign(targetObject, JSON.parse(stringfiedData));
    })
  } else {

  }

  if(req.url === '/home') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(targetObject));
  } else if(req.url === '/about') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>About Page</h1></body></html>')
  } else {
    res.statusCode = 404;
    res.end();
  }
});

serer.listen(port, () => {
  console.log(`Listening on port ${port}`);
})