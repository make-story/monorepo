/**
 * https://github.com/gitdagray/express_jwt/blob/main/routes/auth.js
 */
const express = require('express');

const router = express.Router();
const authController = require('./controller');

router.post('/auth', authController.handleLogin);

/**
 * app.use('/', require('./server/router'));
 */
module.exports = router;
