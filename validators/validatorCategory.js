const { body, validationResult } = require('express-validator');

const validateCategory = [
   
    body('category_name').notEmpty().withMessage('Category Name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateCategory;