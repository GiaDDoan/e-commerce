const router = require('express').Router();

const itemControllers = require('../controllers/item-controllers');

router.get('/samples', itemControllers.get_sample);
router.get('/categories/all', itemControllers.get_categories);
router.get('/categories', itemControllers.get_items_by_category);
router.get('/filters/price', itemControllers.get_items_by_price);
// router.post('/samples', itemControllers.add_item);

module.exports = router;
