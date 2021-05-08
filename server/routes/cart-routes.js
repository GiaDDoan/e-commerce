const router = require('express').Router();

const cartControllers = require('../controllers/cart-controllers');

router.get('/all', cartControllers.get_all);
router.post('/items', cartControllers.add_item);

module.exports = router;
