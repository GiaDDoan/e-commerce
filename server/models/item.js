const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: String,
    price: Number,
    bodyLocation: String,
    category: String,
    imageSrc: String,
    numInStock: Number,
    companyId: String,
    rating: Number,
  },
  { collection: 'items' }
);

module.exports = mongoose.model('Item', itemSchema);
