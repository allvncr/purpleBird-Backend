const Product = require("../models/product");
const Category = require("../models/category");
const { StatusCodes } = require("http-status-codes");

const getProducts = async (req, res) => {
  const { featured, name, sort } = req.query;
  const queryObject = {};
  if (featured) queryObject.featured = featured;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  let result = Product.find(queryObject);
  const length = (await Product.find(queryObject)).length;
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const lastPage =
    length % perPage ? Math.floor(length / perPage) + 1 : length / perPage;

  result = result.skip(skip).limit(perPage);

  const products = await result;

  res.status(StatusCodes.OK).json({
    products,
    total: products.length,
    page: page,
    perPage: perPage,
    lastPage: lastPage,
  });
};

const getProduct = async (req, res) => {
  const { id: ProductID } = req.params;
  const product = await Product.findById(ProductID);
  if (!product) throw Error(`No Product with id: ${ProductID}`);
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const editProduct = async (req, res) => {
  const { id: ProductID } = req.params;
  const product = await Product.findOneAndUpdate({ _id: ProductID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw Error(`No Product with id: ${ProductID}`);
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: ProductID } = req.params;
  const product = await Product.findByIdAndRemove(ProductID);
  if (!product) throw Error(`No Product with id: ${ProductID}`);
  res.status(StatusCodes.OK).json({});
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
