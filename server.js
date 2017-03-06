var express = require('express');
var websockets = require('./websockets');
var _ = require('lodash');

var app = express();
app.use(require('./controllers'));


var port = !_.isNil(process.env.PORT)? process.env.PORT : 3000;
var server = app.listen(port, function() {
	console.log('Server', process.pid, 'listening on', port);
}); 
websockets.connect(server);