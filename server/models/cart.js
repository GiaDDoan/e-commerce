const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    name: String,
    price: String,
    bodyLocation: String,
    category: String,
    imageSrc: String,
    numInStock: Number,
    companyId: String,
  },
  { collection: 'cart' }
);

module.exports = mongoose.model('Cart', cartSchema);
