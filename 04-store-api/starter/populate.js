//populate the data from products into db directly
require("dotenv").config();
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); //delete all existing products
    await Product.create(jsonProducts); //create data from json products
    console.log("Success!!!!!!");
    process.exit(0); //exit from process
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();

//to run this file -> node populate in cmd
