const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/authMiddleware');
const loginValidator = require('../validators/loginValidator');
const registerValidator = require('../validators/registerValidator');


router.post('/login', loginValidator, authController.loginUser);
router.get('/getAllUsers',  authController.getUser);
router.post('/register', registerValidator, authController.registerUser);
router.post('/admin/login', loginValidator, authController.adminLogin);
router.post('/admin/register', registerValidator, authController.adminRegister);
router.put('/editRole/:userId', authController.editUserRole);
router.put('/updateProfile/:userId', authController.updateUserProfile);


module.exports = router;