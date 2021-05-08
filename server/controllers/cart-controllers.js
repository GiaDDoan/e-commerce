require('dotenv').config();
const Cart = require('../models/cart');
const Item = require('../models/item');
const Company = require('../models/company');

const get_all = async (req, res) => {
  try {
    const cart__ = await Cart.find({}).sort({ rank: 1 }).exec();

    res.status(200).json({
      status: 200,
      message: 'Received all titles',
      cartItems: cart__,
    });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
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
  get_all,
  add_item,
};
