const Product = require('./product.model');

exports.createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

exports.getAllProducts = async () => {
  const products = await Product.find({});
  return products;
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

exports.updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, { new: true });
  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
