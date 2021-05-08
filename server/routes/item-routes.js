const router = require('express').Router();

const itemControllers = require('../controllers/item-controllers');

router.get('/samples', itemControllers.get_sample);
// router.post('/samples', itemControllers.add_item);

module.exports = router;
