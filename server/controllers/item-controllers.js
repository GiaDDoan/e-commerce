require("dotenv").config();
const cart = require("../models/cart");
const Item = require("../models/item");
const Company = require("../models/company");

const get_sample = async (req, res) => {
  // /items/samples?size=8
  try {
    const samples = await Item.aggregate([
      { $sample: { size: parseInt(req.query.size) } },
    ]);

    res.status(200).json({
      status: 200,
      message: "Received all titles",
      samples,
    });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  }
};

const get_sample_by_category = async (req, res) => {
  // /items/samples/category?size=8&companyId=12311
  try {
    const { category, size } = req.query;
    let modifiedCategory = category.includes("_")
      ? category.split("_").join(" ")
      : category;

    const foundArr = await Item.find({ category: modifiedCategory });
    let sampleCategory = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * foundArr.length);
      sampleCategory.push(foundArr[randomNumber]);
    }

    res.status(200).json({
      status: 200,
      message: "Received all titles",
      sample: sampleCategory,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const get_sample_by_company = async (req, res) => {
  // /items/samples/category?size=8&companyId=12311
  try {
    const { companyId, size } = req.query;

    const foundArr = await Item.find({ companyId: companyId });
    let sampleCategory = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * foundArr.length);
      sampleCategory.push(foundArr[randomNumber]);
    }

    res.status(200).json({
      status: 200,
      message: "Received all titles",
      sample: sampleCategory,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const get_categories = async (req, res) => {
  //URL EX: http://localhost:5000/items/categories?category=Pet_and_Animals&page=1&limit=3
  try {
    const items = await Item.find().exec();
    const uniqueSet = new Set(items.map((item) => item.category));
    const uniqueArr = [...uniqueSet];

    res.status(200).json({
      status: 200,
      message: "Received all categories",
      categories: uniqueArr,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error: error.message,
      message: "Couldn't get categories",
    });
  }
};

const get_items_by_category = async (req, res) => {
  try {
    let category_ = req.query.category.includes("_")
      ? req.query.category.split("_").join(" ")
      : req.query.category;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let results = {};
    let newArray = [];

    //Get all items from the same category
    const foundArr = await Item.find({ category: category_ });
    ////Get all unique companies
    const uniqueCompanyId = await new Set(
      foundArr.map((item) => item.companyId)
    );
    const uniqueCompanyIdArray = [...uniqueCompanyId];

    //Divide the array into smaller pieces for pagination
    if (endIndex < foundArr.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.totalPages = Math.ceil(foundArr.length / limit);
    results.results = foundArr.slice(startIndex, endIndex);

    ///////////////////
    for (let i = 0; i < uniqueCompanyIdArray.length; i++) {
      const companyFound = await Company.find({
        companyId: uniqueCompanyIdArray[i],
      });
      newArray.push(companyFound[0]);
    }

    res.status(201).json({
      status: 201,
      uniqueCompanies: newArray,
      items: results,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const post_items_by_filter = async (req, res) => {
  const { min, max, companyIds, category } = req.body;
  try {
    let filteredArray = [];
    const maxPrice = max === null ? 3000 : max;
    const minPrice = min === null ? 0 : min;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let results = {};
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (companyIds.length > 0) {
      await Promise.all(
        companyIds.map(async (id) => {
          const itemsFound = await Item.find({
            companyId: id,
            price: {
              $lt: maxPrice,
              $gt: minPrice,
            },
          });
          //itemsFound = [{...}, {...}]
          filteredArray = await filteredArray.concat(itemsFound);
          return itemsFound; //MAYBE REMOVE
        })
      );
    }
    //MAKE ANOTHER IF STATEMENT FOR CATEGORY IF THERE'S NO COMPANY IDS
    //ADD FILTER FOR H to L or L to H

    // const test = await Item.find({
    //   category: category,
    //   price: { $gt: undefined },
    // });

    if (endIndex < filteredArray.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.totalPages = Math.ceil(filteredArray.length / limit);
    results.results = filteredArray.slice(startIndex, endIndex);

    res.status(200).json({
      status: 200,
      results,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const get_company_by_id = async (req, res) => {
  try {
    const company_id = req.params.companyId;
    const company__ = await Company.find({ companyId: company_id });

    res.status(201).json({
      status: 201,
      company: company__,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const get_items_by_price = async (req, res) => {
  //URL EX: http://localhost:5000/items/filters/price?category=Fitness&min=0&max=25
  try {
    let category_ = req.query.category.includes("_")
      ? req.query.category.split("_").join(" ")
      : req.query.category;
    const min = parseInt(req.query.min);
    const max = parseInt(req.query.max);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    const filteredArray = await Item.find({
      category: category_,
      price: { $lt: 25.0, $gt: 23.0 },
    });

    const foundArr = await Item.find({ category: category_ });
    if (endIndex < foundArr.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.totalPages = Math.ceil(foundArr.length / limit);
    results.results = foundArr.slice(startIndex, endIndex);

    res.status(201).json({
      status: 201,
      items: filteredArray,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const get_item_by_id = async (req, res) => {
  try {
    const product_id = req.params.productId;

    const product = await Item.findOne({ _id: product_id });
    const company = await Company.findOne({ companyId: product.companyId });

    res.status(200).json({
      status: 200,
      product: product,
      company: company,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const add_item = async (req, res) => {
  try {
    res.status(201).json({ status: 201, title: "added" });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const items_by_filter = async (req, res) => {
  const { min, max, companyIds, category, sort } = req.body;

  try {
    const itemsInCategory = await Item.find({
      category: category.includes("_")
        ? category.split("_").join(" ")
        : category,
    });

    let filteredArray = [];
    let results = {};
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let MIN = min;
    let MAX = max;
    const highestPrice = Math.max(...itemsInCategory.map((item) => item.price));

    //Check if a company is selected
    if (companyIds.length > 0) {
      itemsInCategory.map((item) => {
        if (companyIds.includes(parseInt(item.companyId))) {
          filteredArray.push(item);
        }
      });
    } else {
      filteredArray = [...itemsInCategory];
    }

    //Check if there's a price filter
    if (min != null || max != null) {
      if (max == null) {
        MAX = highestPrice;
      }
      filteredArray = filteredArray.filter((item) => {
        return item.price > MIN && item.price <= MAX;
      });
    }

    //Check for sort filter
    if (sort !== "") {
      if (sort === "lowToHigh") {
        filteredArray.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highToLow") {
        filteredArray.sort((a, b) => {
          return b.price - a.price;
        });
      }
    }
    //ADD LOWER TO HIGH, VICE-VERSA

    if (endIndex < filteredArray.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.totalPages = Math.ceil(filteredArray.length / limit);
    results.results = filteredArray.slice(startIndex, endIndex);

    res.status(200).json({
      status: 200,
      results,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

module.exports = {
  get_sample,
  get_sample_by_category,
  get_sample_by_company,
  get_categories,
  get_items_by_category,
  get_company_by_id,
  get_items_by_price,
  add_item,
  get_item_by_id,
  post_items_by_filter,
  items_by_filter,
};
