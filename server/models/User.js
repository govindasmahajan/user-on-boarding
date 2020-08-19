const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	id: Number,
	full_name: String

});
var User = mongoose.model('users', userSchema);

module.exports = { User }