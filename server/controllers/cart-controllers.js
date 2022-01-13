require("dotenv").config();
const Cart = require("../models/cart");
const Item = require("../models/item");
const Company = require("../models/company");
const items = require("../data/items.json");
const companies = require("../data/companies.json");

const get_cart = async (req, res) => {
  try {
    // const cart__ = await Cart.find({}).sort({ rank: 1 }).exec();
    //Make a function to only give back the data with the same googleId
    const id = req.query.userId;
    const cartData = await Cart.find({ userId: id }).exec();

    res.status(200).json({
      status: 200,
      message: "Received cart items",
      data: cartData,
    });
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  }
};

const add_item = async (req, res) => {
  //URL: ../cart/items?userId=2&itemId=10&qty=17&stock=10
  try {
    const { userId, itemId, quantity } = req.body;

    //Check if the user is already in the DB
    const existingId = await Cart.findOne({
      userId: userId,
    }).exec();

    //If TRUE, update the cart
    if (existingId) {
      //Check if the item is already in the cart
      const found = await existingId.items.find(
        (item) => item.itemId === itemId
      );
      //If in the cart, update
      if (found) {
        Cart.updateOne(
          {
            userId: userId,
            "items._id": found._id,
          },
          { $set: { "items.$.quantity": quantity } }
        ).exec();

        console.log("found updated");
      } else {
        //If not, add item to user's cart
        const query = {
          userId: userId,
        };

        Cart.findOneAndUpdate(query, {
          $push: {
            items: {
              itemId: itemId,
              quantity: quantity,
            },
          },
        }).exec();
        console.log("added");
      }
    } else {
      //If user is not in DB, create one
      const addItemToCart = await new Cart({
        userId: userId,
        items: [
          {
            itemId: itemId,
            quantity: quantity,
          },
        ],
      });
      addItemToCart.save();
    }

    res.status(201).json({ status: 201, cart: "changed" });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

const add_companies = async (req, res) => {
  ////////ADD Companies
  // companies.map(async (company) => {
  //   const newCompany = await new Company({
  //     name: company.name,
  //     url: company.url,
  //     country: company.country,
  //     companyId: company._id,
  //   });

  //   newCompany.save();
  // });

  try {
    /////To reset ITEMS database
    // const lorem = new LoremIpsum({
    //   sentencesPerParagraph: {
    //     max: 8,
    //     min: 4,
    //   },
    //   wordsPerSentence: {
    //     max: 10,
    //     min: 4,
    //   },
    // });

    // items.map(async (item) => {
    //   const randomNumber = Math.floor(Math.random() * 3 + 2);

    //   let description = await lorem.generateSentences(randomNumber);
    //   if (!item.price.includes(".")) {
    //     let rating = (Math.random() * 3 + 2).toFixed(2);
    //     let newPrice = await `${item.price.substring(1)}.99`;

    //     let numberPrice = await parseFloat(newPrice);

    //     const addedItem = await new Item({
    //       name: item.name,
    //       price: numberPrice,
    //       bodyLocation: item.body_location,
    //       category: item.category,
    //       imageSrc: item.imageSrc,
    //       numInStock: item.numInStock,
    //       companyId: item.companyId,
    //       rating: rating,
    //       description: description,
    //     });

    //     addedItem.save();
    //   }

    //   if (item.price.includes(".")) {
    //     let rating = (Math.random() * 3 + 2).toFixed(2);
    //     let newNumber = parseFloat(item.price.substring(1));

    //     const addedItem = await new Item({
    //       name: item.name,
    //       price: newNumber,
    //       bodyLocation: item.body_location,
    //       category: item.category,
    //       imageSrc: item.imageSrc,
    //       numInStock: item.numInStock,
    //       companyId: item.companyId,
    //       rating: rating,
    //       description: description,
    //     });

    //     addedItem.save();
    //   }
    // });

    res.status(201).json({ status: 201, title: "DB done" });
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
};

module.exports = {
  get_cart,
  add_item,
  add_companies,
};
