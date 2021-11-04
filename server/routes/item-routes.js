const router = require('express').Router();

const itemControllers = require('../controllers/item-controllers');

router.get('/samples', itemControllers.get_sample);
router.get('/categories/all', itemControllers.get_categories);
router.get('/categories', itemControllers.get_items_by_category);
router.get('/company/:companyId', itemControllers.get_company_by_id);
router.get('/filters/price', itemControllers.get_items_by_price);
router.get('/product/:productId', itemControllers.get_item_by_id);
// router.post('/filter', itemControllers.post_items_by_filter);
router.post('/filter', itemControllers.items_by_filter);
// router.post('/samples', itemControllers.add_item);

module.exports = router;
