const express = require("express");
const router = express.Router();
const category = require("./models/category");
const product = require("./models/product");

router.use("/api/categories", category);
router.use("/api/products", product);

module.exports = router;
