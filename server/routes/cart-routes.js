const router = require('express').Router();

const cartControllers = require('../controllers/cart-controllers');

router.get('/get-all', cartControllers.get_all);

module.exports = router;
