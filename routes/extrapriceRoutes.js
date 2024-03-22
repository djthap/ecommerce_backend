const express = require('express');
const router = express.Router();
const extraPriceController = require('../controllers/extraPriceController');

// Routes for ExtraPrice
router.get('/', extraPriceController.getAllExtraPrices);
router.post('/', extraPriceController.createExtraPrice);
router.put('/:id', extraPriceController.updateExtraPrice);
router.delete('/:id', extraPriceController.deleteExtraPrice);

module.exports = router;
