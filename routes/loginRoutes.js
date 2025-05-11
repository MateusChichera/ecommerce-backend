const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { login } = require('../controllers/AuthController');



router.post('/', loginController.login);

module.exports = router;