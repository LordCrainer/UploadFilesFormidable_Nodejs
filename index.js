'use strict';
const fs = require('fs')
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
const PORT = 8080;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var routes = require('./routes/routes')

app.use(express.static(__dirname + '/public'));
app.use('/files', express.static(__dirname + '/uploadNode'));

routes.asignarRoute(app);


app.listen(PORT, ()=>{
  console.log('Servidor para subir videos: ', PORT);
})


/*http.createServer(function (req, res) {

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
});*/
