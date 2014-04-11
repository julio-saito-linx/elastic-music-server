
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 9004);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', routes.index);

// static local files
// TODO: this must be configurable
app.use('/MP3-01', express.static( '/media/julio/4 H-MP3 (1,36 TB)/' ));
app.use('/MP3-02', express.static( '/media/julio/B21AB1E71AB1A92D/' ));
app.use('/MP3-03', express.static( '/media/julio/2GB, new/' ));
app.use('/MP3-04', express.static( '/media/julio/Files/' ));
app.use('/MP3-05', express.static( '/home/julio/Música/' ));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
