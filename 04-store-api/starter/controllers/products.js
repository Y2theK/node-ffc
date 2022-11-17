const Product = require("../models/product");
const getAllProducts = async (req, res) => {
  // throw new Error("Test ERROR"); // auto throw to default error handler cause of express-aysnc-errors package
  // const products = await Product.find(req.query); // return result according to query // nth return if some unexist field passed like jobs=web
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // queryObject.name = name;  //only work on exact name
    queryObject.name = { $regex: name, $options: "i" }; // options 'i' for case insensitive
  }
  //filter the field we want to be searched
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};
module.exports = {
  getAllProducts,
};
