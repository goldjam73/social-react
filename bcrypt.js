var bcrypt = {
	compare: function(password1, password2, callback) {
		var valid = password1 === password2;
		callback(false, valid);
	},
	hash: function (password, cycles, callback){
		callback(false, password);
	}
};
module.exports = bcrypt; 