const router = require("express").Router();

const cartControllers = require("../controllers/cart-controllers");

router.get("/items", cartControllers.get_cart);
router.post("/items", cartControllers.add_item);
router.post("/reset-database", cartControllers.add_companies);

module.exports = router;
