const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	fullname: { type: String, required: true },
	password: { type: String, required: true },
  website: {type: String},
  bio: {type: String},
  phone: {type: Number},
  gender: {type: String},
  profile: {type: String}
});

userSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
