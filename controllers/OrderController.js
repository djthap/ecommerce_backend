const Order = require('../models/Order.js')
const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.createOrder = async (req, res) => {
	try {
		const {
			phoneNumber,
			address,
			cardHolderName,
			cardNumber,
			cvv,
			expiryDate,
			items,
			totalPrice,
		} = req.body

		if (!Array.isArray(items) || items.length === 0) {
			return res
				.status(400)
				.json({
					message: 'Items array is empty or not properly formatted',
				})
		}
		const token = req.header('Authorization')
		const decoded = jwt.verify(token, 'this-is-our-web-app')
		const createdBy = decoded.user.id
		const order = new Order({
			phoneNumber,
			address,
			cardHolderName,
			cardNumber,
			cvv,
			expiryDate,
			totalPrice,
			items,
			createdBy,
			status: 'pending',
		})

		await order.save()
		res.status(201).json(order)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.updateOrderStatus = async (req, res) => {
	try {
		const { id } = req.params
		const { status } = req.body
		const token = req.header('Authorization')
		const decoded = jwt.verify(token, 'this-is-our-web-app')
		const updatedBy = decoded.user.id
		const order = await Order.findByIdAndUpdate(
			id,
			{ status, updatedBy },
			{ new: true }
		)
		res.json(order)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}

exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate('items')
			.populate('createdBy updatedBy', 'name')
		res.json(orders)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}
exports.getOrdersByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ createdBy: userId })
            .populate('items')
            .populate('createdBy updatedBy', 'name');
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteOrder = async (req, res) => {
	try {
		const { id } = req.params
		await Order.findByIdAndDelete(id)
		res.json({ message: 'Order deleted successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Server Error' })
	}
}
