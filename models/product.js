const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide category"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name can't be less than 3 characters"],
      maxlength: [50, "Name can't be more than 50 characters"],
      index: true,
      unique: [true, "This name is already in used"],
    },
    price: {
      type: Number,
      required: [true, "Please provide valid price"],
      min: 0,
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
