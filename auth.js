var jwt = require('jwt-simple');
var config = require('./config');
var _ = require('lodash');

module.exports = function (req, res, next) {
	if (! _.isNil(req.headers['x-auth'])) {
		req.auth = jwt.decode(req.headers['x-auth'], config.secret);
	}
	next();
};