const router = require("express").Router();

const searchControllers = require("../controllers/search-controllers");

router.get("/", searchControllers.get_search);

module.exports = router;
