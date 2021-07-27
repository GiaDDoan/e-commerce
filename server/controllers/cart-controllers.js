require('dotenv').config();
const Cart = require('../models/cart');
const Item = require('../models/item');
const Company = require('../models/company');
const items = require('../data/items.json');
const companies = require('../data/companies.json');

const get_cart = async (req, res) => {
  try {
    // const cart__ = await Cart.find({}).sort({ rank: 1 }).exec();
    //Make a function to only give back the data with the same googleId
    const id = req.query.userId;
    const cartData = await Cart.find({ userId: id }).exec();
    // console.log('data', cartData);

    res.status(200).json({
      status: 200,
      message: 'Received cart items',
      data: cartData,
    });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  }
};

const add_item = async (req, res) => {
  //URL: ../cart/items?userId=2&itemId=10&qty=17&stock=10
  try {
    const { userId, itemId, qty, stock } = req.query;
    const existingId = await Cart.findOne({
      userId: userId,
      itemId: itemId,
    }).exec();
    //Query for updating if the item exist in the DB
    const query = {
      userId: userId,
      itemId: itemId,
    };
    console.log('itemId', itemId);

    //Check if the item is already in the user's cart, TRUE = update, FALSE = add
    if (existingId) {
      console.log('item exist');
      Cart.findOneAndUpdate(query, {
        $set: { quantity: existingId.quantity + parseInt(qty) },
      }).exec();
    } else {
      console.log('doesnt exist, adding');
      const addItemToCart = await new Cart({
        userId: userId,
        itemId: itemId,
        quantity: parseInt(qty),
      });
      addItemToCart.save();
      console.log('new item added');
    }

    res.status(201).json({ status: 201, cart: 'changed' });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const add_companies = async (req, res) => {
  ////////ADD Companies

  companies.map(async (company) => {
    const newCompany = await new Company({
      name: company.name,
      url: company.url,
      country: company.country,
      companyId: company._id,
    });

    newCompany.save();
  });

  try {
    /////To reset database
    items.map(async (item) => {
      if (!item.price.includes('.')) {
        let newPrice = await `${item.price.substring(1)}.99`;

        let numberPrice = await parseFloat(newPrice);
        // console.log(numberPrice);

        const addedItem = await new Item({
          name: item.name,
          price: numberPrice,
          bodyLocation: item.body_location,
          category: item.category,
          imageSrc: item.imageSrc,
          numInStock: item.numInStock,
          companyId: item.companyId,
        });

        addedItem.save();
      }

      if (item.price.includes('.')) {
        let newNumber = parseFloat(item.price.substring(1));
        // console.log(newNumber);

        const addedItem = await new Item({
          name: item.name,
          price: newNumber,
          bodyLocation: item.body_location,
          category: item.category,
          imageSrc: item.imageSrc,
          numInStock: item.numInStock,
          companyId: item.companyId,
        });

        addedItem.save();
      }
    });

    res.status(201).json({ status: 201, title: 'added' });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

module.exports = {
  get_cart,
  add_item,
  add_companies,
};
