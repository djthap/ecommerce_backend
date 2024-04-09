// emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/contactUsController');

// Route to send email
router.post('/send-email', emailController.sendEmail);

module.exports = router;
