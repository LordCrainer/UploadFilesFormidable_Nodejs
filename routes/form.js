'use strict';

module.exports = function(req, res) {
  //res.writeHead(200, {'content-type': 'text/html'});
  res.send(
    `
    <html>
    <head>
    </head>
    <body>
    <form action="/upload" enctype="multipart/form-data" method="post" >
    <input type="file" name="upload" multiple="multiple" style="font-size: 20px; padding: 10px;"><br>
    <input type="checkbox" value="Mover"  style="font-size: 20px;margin: 10px;">MOVER<br>
    <input type="submit" value="Upload"  style="font-size: 20px;margin: 10px;">
    </form>
    </body>
    </html>`

  );
};
