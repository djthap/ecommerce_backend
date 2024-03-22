const express = require('express');
const router = express.Router();
const categoryController = require('../validators/validatorCategory');
const { createCategory, updateCategory, deleteCategory, getCategory } = require('../controllers/categoryController');

router.post('/',categoryController,createCategory);
router.get('/', getCategory);


router.put('/:id', categoryController,updateCategory);


router.delete('/:id', deleteCategory);

module.exports = router;
