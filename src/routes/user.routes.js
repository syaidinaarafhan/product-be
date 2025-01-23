const express = require('express');
const { register, login, profile } = require('../controller/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', verifyToken, profile);

module.exports = router;