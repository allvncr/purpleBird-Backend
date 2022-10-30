const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/product");

router.get("/", getProducts);
router.post("/", upload.array(), createProduct);
router.patch("/:id", upload.array(), editProduct);
router.route("/:id").get(getProduct).delete(deleteProduct);

module.exports = router;
