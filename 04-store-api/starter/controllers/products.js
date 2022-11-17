const getAllProducts = async (req, res) => {
  throw new Error("Test ERROR");
  res.status(200).send("Get All Products");
};
module.exports = {
  getAllProducts,
};
