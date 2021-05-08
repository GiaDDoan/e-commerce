const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
//Imported Routes
const cartRoutes = require('./routes/cart-routes');

mongoose.connect(process.env.MONGO_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('db connected'));

const PORT = 5000;

app
  // .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())

  .use('/cart', cartRoutes)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
