const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
	phoneNumber: String,
	address: String,
	cardHolderName: String,
	cardNumber: String,
	cvv: String,
	expiryDate: String,
	totalPrice: Number,
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
	createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, 
	updatedBy:{ type: Schema.Types.ObjectId, ref: 'User' },
	status: {
		type: String,
	},
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
