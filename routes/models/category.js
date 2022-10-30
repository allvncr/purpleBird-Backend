const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  getCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
  getCategoryProducts,
} = require("../../controllers/category");

router.get("/", getCategories);
router.post("/", upload.array(), createCategory);
router.patch("/:id", upload.array(), editCategory);
router.route("/:id").get(getCategory).delete(deleteCategory);
router.get("/:id/products", getCategoryProducts);

module.exports = router;
