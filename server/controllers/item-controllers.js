require('dotenv').config();
const cart = require('../models/cart');
const Item = require('../models/item');

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
  try {
    const items = await Item.find().exec();
    const uniqueSet = new Set(items.map((item) => item.category));
    const uniqueArr = [...uniqueSet];
    console.log(uniqueArr);

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
  add_item,
};
