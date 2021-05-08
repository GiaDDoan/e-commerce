const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: String,
    price: String,
    bodyLocation: String,
    category: String,
    imageSrc: String,
    numInStock: Number,
    companyId: String,
  },
  { collection: 'items' }
);

module.exports = mongoose.model('Item', itemSchema);
