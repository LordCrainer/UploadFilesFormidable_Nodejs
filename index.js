'use strict';
const fs = require('fs')
const http = require('http');

const uploaderRoute = require('./routes/uploader');
const formRoute = require('./routes/form');
const notFoundRoute = require('./routes/notFound');
const PORT = 8080;

http.createServer(function (req, res) {

  if (req.url.toLowerCase() === '/upload' && req.method.toLowerCase() === 'post') {
    return uploaderRoute(req, res);
  }
  else if (req.url.toLowerCase() === '/form' && req.method.toLowerCase() === 'get') {
    return formRoute(req, res);
  }
  else {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
      });
    //return notFoundRoute(req, res);
  }
}).listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server is running ${PORT}. single-upload-files-master`);
});
