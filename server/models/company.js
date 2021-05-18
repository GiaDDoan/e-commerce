const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: String,
    url: String,
    country: String,
    companyId: Number,
  },
  { collection: 'companies' }
);

module.exports = mongoose.model('Company', companySchema);
