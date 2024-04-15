const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');


router.post('/', orderController.createOrder);
router.put('/:id/status', orderController.updateOrderStatus);
router.get('/userOrders/:userId', orderController.getOrdersByUser);

router.get('/', orderController.getAllOrders);
router.delete('/:id', orderController.deleteOrder);
router.post('/create-checkout-session', orderController.StripePayment);

module.exports = router;