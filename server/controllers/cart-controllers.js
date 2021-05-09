require('dotenv').config();
const Cart = require('../models/cart');
const Item = require('../models/item');
const Company = require('../models/company');
const items = require('../data/items.json');

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
  /////To reset database
  // items.map(async (item) => {
  //   if (!item.price.includes('.')) {
  //     let newPrice = `${item.price}.99`;

  //     const addedItem = await new Item({
  //       name: item.name,
  //       price: newPrice,
  //       bodyLocation: item.body_location,
  //       category: item.category,
  //       imageSrc: item.imageSrc,
  //       numInStock: item.numInStock,
  //       companyId: item.companyId,
  //     });

  //     addedItem.save();
  //   }

  //   if (item.price.includes('.')) {
  //     const addedItem = await new Item({
  //       name: item.name,
  //       price: item.price,
  //       bodyLocation: item.body_location,
  //       category: item.category,
  //       imageSrc: item.imageSrc,
  //       numInStock: item.numInStock,
  //       companyId: item.companyId,
  //     });

  //     addedItem.save();
  //   }
  // });

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
