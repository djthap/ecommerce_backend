const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String },
	password: { type: String, required: true },
	streetAddress: { type: String },
	postalCode: { type: String },
	city: { type: String },
	country: { type: String },
	phone: { type: String },
	role: { type: String, default: 'User' },
})

module.exports = mongoose.model('User', userSchema)
