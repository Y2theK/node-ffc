const Product = require("../models/product");
const getAllProducts = async (req, res) => {
  // throw new Error("Test ERROR"); // auto throw to default error handler cause of express-aysnc-errors package
  // const products = await Product.find(req.query); // return result according to query // nth return if some unexist field passed like jobs=web
  const { featured, company, name, sort, fields, numericFilter } = req.query;
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
  //numericFiltering
  if (numericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$e",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|<|<=|=|>=|>)\b/g;
    let filter = numericFilter.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filter);
    const options = ["price", "rating"];
    filter = filter.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }; //dynamic key []
        // queryObject.field = { operator: Number(value) };
      }
    });
    console.log(queryObject);
  }
  //filter the field we want to be searched
  let result = Product.find(queryObject).select("name price");
  //sorting
  if (sort) {
    //sort=name,-price => .sort('name -price)
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort({ createdAt: -1 });
  }
  //selecting field
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  //limiting result
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
module.exports = {
  getAllProducts,
};
