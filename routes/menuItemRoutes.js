const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', menuItemController.getAllMenuItems);
router.get('/top3', menuItemController.getRandomMenuItems);

router.post('/', menuItemController.createMenuItem);

router.put('/:id', isAuthenticated, menuItemController.updateMenuItem);

router.delete('/:id', menuItemController.deleteMenuItem);


router.get('/category/:categoryId', menuItemController.getMenuItemsByCategory);


router.get('/:id', menuItemController.getMenuItemById);

router.post('/uploadImage', menuItemController.uploadImage); // Add route for image upload

module.exports = router;
