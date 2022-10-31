const express = require("express");
var cors = require("cors");
const router = express.Router();
router.use(cors());
const category = require("./models/category");
const product = require("./models/product");

router.use("/api/categories", category);
router.use("/api/products", product);

module.exports = router;
