const router = require('express').Router();
const userControllers = require('../controllers/user-controllers');

router.post('/google-login', userControllers.google_login);

module.exports = router;
