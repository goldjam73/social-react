var jwt = require('jsonwebtoken');
var bcrypt = require('../../../bcrypt');
var User = require('../../../models/user');
var config = require('../../../config');

exports.create = function(username, password, callback) {
	var user = new User({
		username: username
	});
	bcrypt.hash(password, 10, function(err, hash) {
		if (err) {
			return callback(err);
		}
		user.password = hash;
		user.save(function(err) {
			if (err) {
				return callback(err);
			}
			user.token = jwt.sign({
				username: user.username
			}, config.secret);
			callback(null, user);
		});
	});
};