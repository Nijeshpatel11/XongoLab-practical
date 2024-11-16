const express = require('express');
const { register, login } = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/register', validateRequest, register);
router.post('/login', validateRequest, login);

module.exports = router;
