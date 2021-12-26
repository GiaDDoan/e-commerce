require("dotenv").config();
const Item = require("../models/item");

const get_search = async (req, res) => {
  // /search?searchInput=string
  try {
    const { searchInput } = req.query;
    //RegEx to ignore case sensitive search
    const regexSearch = new RegExp(searchInput, "i");

    //Add a limiter from 1 to 10, then a "See more..." for 10+
    const foundArr = await Item.find({
      name: { $regex: regexSearch },
    });

    res.status(200).json({
      status: 200,
      message: "Received all search",
      searchArray: foundArr,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

module.exports = {
  get_search,
};
