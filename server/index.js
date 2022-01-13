const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
//Imported Routes
const cartRoutes = require("./routes/cart-routes");
const itemRoutes = require("./routes/item-routes");
const userRoute = require("./routes/user-routes");
const searchRoute = require("./routes/search-routes");

mongoose.connect(process.env.MONGO_URI || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("db connected"));

app
  // .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use(express.json())

  .use("/cart", cartRoutes)
  .use("/items", itemRoutes)
  .use("/api", userRoute)
  .use("/search", searchRoute)

  // .listen(PORT, () => console.info(`Listening on port ${PORT}`));
  .listen(process.env.PORT || 5000, () =>
    console.info(`Listening on port ${PORT}`)
  );
