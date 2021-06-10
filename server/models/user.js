const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetLink: {
      data: String,
      default: '',
    },
  },
  { timestamps: true },
  { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
