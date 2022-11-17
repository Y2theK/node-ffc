const getAllProducts = async (req, res) => {
  res.status(200).send("Get All Products");
};
module.exports = {
  getAllProducts,
};
