const router = require("express").Router();

const searchControllers = require("../controllers/search-controllers");

router.get("/", searchControllers.get_search);
router.get("/page", searchControllers.get_search_with_page);

module.exports = router;
