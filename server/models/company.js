const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: String,
    url: String,
    country: String,
  },
  { collection: 'companies' }
);

module.exports = mongoose.model('Company', companySchema);
