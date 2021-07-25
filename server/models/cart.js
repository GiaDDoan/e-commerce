const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userId: String,
    itemId: String,
    quantity: Number,
  },
  { collection: 'cart' }
);

module.exports = mongoose.model('Cart', cartSchema);
