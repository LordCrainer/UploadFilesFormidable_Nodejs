var form = require('./form');
var uploader = require('./uploader');

exports.asignarRoute = function(app) {
  app.post('/upload', uploader);
  app.get('/form', form);
}
