const mongoose = require("mongoose");

const CategoryShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name can't be less than 3 characters"],
    maxlength: [20, "Name can't be more than 20 characters"],
    index: true,
    unique: true,
  },
});

module.exports = mongoose.model("Category", CategoryShema);
