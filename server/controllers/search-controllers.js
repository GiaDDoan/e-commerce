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

const get_search_with_page = async (req, res) => {
  try {
    const { searchInput, page, limit } = req.query;
    //RegEx to ignore case sensitive search
    const regexSearch = new RegExp(searchInput, "i");
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const startIndex = (parsedPage - 1) * parsedLimit;
    const endIndex = parsedPage * parsedLimit;
    let results = {};

    //Add a limiter from 1 to 10, then a "See more..." for 10+
    const foundArr = await Item.find({
      name: { $regex: regexSearch },
    });

    if (endIndex < foundArr.length) {
      results.next = {
        page: parsedPage + 1,
        limit: parsedLimit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: parsedPage - 1,
        limit: parsedLimit,
      };
    }
    results.totalPages = Math.ceil(foundArr.length / limit);
    results.results = foundArr.slice(startIndex, endIndex);

    res.status(200).json({
      status: 200,
      message: "Received all search",
      searchArray: results,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

module.exports = {
  get_search,
  get_search_with_page,
};
