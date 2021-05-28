require('dotenv').config();
const cart = require('../models/cart');
const Item = require('../models/item');
const Company = require('../models/company');

const get_sample = async (req, res) => {
  // /items/samples?size=8
  try {
    const samples = await Item.aggregate([
      { $sample: { size: parseInt(req.query.size) } },
    ]);

    res.status(200).json({
      status: 200,
      message: 'Received all titles',
      samples,
    });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
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
      message: 'Received all categories',
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
    let category_ = req.query.category.includes('_')
      ? req.query.category.split('_').join(' ')
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
    let category_ = req.query.category.includes('_')
      ? req.query.category.split('_').join(' ')
      : req.query.category;
    const min = parseInt(req.query.min);
    const max = parseInt(req.query.max);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    console.log(category_, min, max);

    const filteredArray = await Item.find({
      category: category_,
      price: { $lt: 25.0, $gt: 23.0 },
    });
    console.log(filteredArray.length);

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

    const product = await Item.find({ _id: product_id });

    res.status(200).json({
      status: 200,
      product: product,
    });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const add_item = async (req, res) => {
  try {
    res.status(201).json({ status: 201, title: 'added' });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

module.exports = {
  get_sample,
  get_categories,
  get_items_by_category,
  get_company_by_id,
  get_items_by_price,
  add_item,
  get_item_by_id,
};
