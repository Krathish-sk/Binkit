import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel;
