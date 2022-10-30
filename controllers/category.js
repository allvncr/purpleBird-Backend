const Category = require("../models/category");
const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const product = require("../models/product");

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

const getCategory = async (req, res) => {
  const { id: CategoryID } = req.params;
  const category = await Category.findById(CategoryID);
  if (!category) {
    throw Error(`No Category with id: ${CategoryID}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};

const deleteCategory = async (req, res) => {
  const { id: CategoryID } = req.params;
  const category = await Category.findByIdAndRemove(CategoryID);
  if (!category) {
    throw Error(`No Category with id: ${CategoryID}`);
  }
  res.status(StatusCodes.OK).json({});
};

const editCategory = async (req, res) => {
  const { id: CategoryID } = req.params;
  const category = await Category.findOneAndUpdate(
    { _id: CategoryID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category) {
    throw Error(`No Category with id: ${CategoryID}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

const getCategoryProducts = async (req, res) => {
  const { id: CategoryID } = req.params;
  const category = await Category.findById(CategoryID);
  if (!category) {
    throw Error(`No Category with id: ${CategoryID}`);
  }
  const { featured, name, sort } = req.query;
  const queryObject = {
    category: CategoryID,
  };
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
  products.forEach((product) => {
    product.category = category;
  });

  res.status(StatusCodes.OK).json({
    products,
    total: products.length,
    page: page,
    perPage: perPage,
    lastPage: lastPage,
  });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
  getCategoryProducts,
};
