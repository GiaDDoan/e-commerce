const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    itemName: String, // String is shorthand for {type: String}
    rank: Number,
  },
  { collection: 'cart' }
);

module.exports = mongoose.model('Cart', cartSchema);
