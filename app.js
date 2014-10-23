var static = require('node-static');
var fs = require('fs');
var path = require('path');

//
// Create a node-static server to serve the current directory
//
var fullPath = '../../mounts';
console.log('fs.existsSync(fullPath) = ', fs.existsSync(fullPath));
var file = new static.Server(fullPath, { cache: 7200, headers: {'X-Hello':'World!'} });

require('http').createServer(function (request, response) {
  // response.redirect(newUrl);

  // CORS
  // response.header("Access-Control-Allow-Origin", "*");
  // response.header("Access-Control-Allow-Headers", "X-Requested-With");

    file.serve(request, response, function (err, res) {

        if (err) { // An error as occured
            console.error("> Error serving " + request.url + " - " + err.message);
            response.writeHead(err.status, err.headers);
            response.end();
        } else { // The file was served successfully
            console.log("> " + request.url + " - " + res.message);

        }
    });
}).listen(process.env.HTTP_PORT || 9004);

console.log("> node-static is listening...");

