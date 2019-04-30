'use strict';
const formidable = require('formidable');
module.exports = function (req, res) {
  const uploadedFiles = [];
  var progress = 0;
  var initTime = ''
  var finalTime = '';
  var porcentajeAnterior =0;
  var cnt = 0;
  try {
    const form = new formidable.IncomingForm({
      encoding: 'utf-8',
      uploadDir: './uploads',
      keepExtensions: true,
      maxFileSize: 2000 * 1024 * 1024, // 2000MB
      hash: 'md5'
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
      var porcentaje = parseInt((bytesReceived/bytesExpected) * 100);
      if(porcentaje%5==0 && porcentaje!=porcentajeAnterior){ //porcentaje%5==0 &&
        console.log(`Progress: ${porcentaje}`);
        porcentajeAnterior = porcentaje;
      }

    })
    .on('fileBegin', function(name, file) {
      initTime = new Date();
      console.log(`fileBegin: name: ${name} file: ${JSON.stringify(file)}`);
    })
    .on('file', function(name, file) {
      uploadedFiles.push(file);
    })
    .on('error', function(err) {
      console.error('Form error', err);
    })
    .on('aborted', function (){
      console.log("aborted");
    })
    .on('end', () => {
      console.log(`Upload complete: ${JSON.stringify(uploadedFiles)}`);
      var finalTime, segundos, minutos;
      finalTime = new Date();
      var duracion = new Date(finalTime-initTime);
      segundos = duracion.getSeconds() < 10? "0"+duracion.getSeconds():duracion.getSeconds();
      minutos = duracion.getMinutes();
      console.log(`Duration: ${minutos}:${segundos}`);
    });

    form.parse(req, function (err, fields, files) {
      if (err) {
        res.writeHead(500, { 'content-type': 'application/json' });
        return res.end(err);
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ files: uploadedFiles }));
    });
  }
  catch (err) {
    res.writeHead(500, { 'content-type': 'application/json' });
    return res.end(err);
  }
};
