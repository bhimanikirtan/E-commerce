const { default: mongoose } = require("mongoose");
const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, size, color, productType } =
      req.body;
    if (!name || !price || !stock || !size || !color) {
      return res
        .status(400)
        .json({ msg: "All fields are required", status: 400 });
    }
    if (!req.file) {
      return res.status(500).json({ msg: "image is required", status: 500 });
    } else {
      image = req.file.path;
    }
    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      image,
      size,
      color,
      productType,
    });
    await newProduct.save();
    const AllProduct = await Product.find({});
    return res.status(201).json({
      status: 201,
      msg: "product add successfully",
      AllProduct,
    });
  } catch (error) {
    console.error("add Product Error:", error);
    return res.status(500).json({ status: 500, msg: "add Product Failed" });
  }
};

const getAllproducts = async (req, res) => {
  try {
    const userId = req.user?.id
      ? new mongoose.Types.ObjectId(req.user.id)
      : null;
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const { filters = {} } = req.body;

    const match = {};

    if (filters.productType?.length)
      match.productType = { $in: filters.productType };
    if (filters.color?.length) match.color = { $in: filters.color };
    if (filters.size?.length) match.size = { $in: filters.size };
    if (Array.isArray(filters.price) && filters.price.length === 2) {
      match.price = {
        $gte: filters.price[0] || 0,
        $lte: filters.price[1] || Infinity,
      };
    }

    const pipeline = [{ $match: match }];
    console.log(pipeline);
    pipeline.push({
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "productId",
        as: "ratings",
      },
    });

    if (userId) {
      pipeline.push({
        $lookup: {
          from: "likes",
          let: { pid: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$productId", "$$pid"] },
                    { $eq: ["$userId", userId] },
                  ],
                },
              },
            },
          ],
          as: "wishlistslike",
        },
      });
    }

    pipeline.push(
      {
        $addFields: {
          rating: { $round: [{ $avg: "$ratings.rating" }, 1] },
          isLiked: userId
            ? {
                $cond: {
                  if: { $gt: [{ $size: "$wishlistslike" }, 0] },
                  then: true,
                  else: false,
                },
              }
            : false,
        },
      },
      {
        $project: {
          ratings: 0,
          wishlistslike: 0,
        },
      },
      { $skip: skip },
      { $limit: limit }
    );

    const products = await Product.aggregate(pipeline);
    const total = await Product.countDocuments(match);

    return res.status(200).json({
      status: 200,
      msg: "fetch all products",
      products,
      total,
    });
  } catch (error) {
    console.error("error to fetch product", error);
    return res.status(500).json({
      status: 500,
      msg: "error to fetch product",
    });
  }
};

const getNewArrivalproducts = async (req, res) => {
  try {
    const products = await Product.find({ productType: "newArrival" });
    return res
      .status(200)
      .json({ status: 200, msg: "fetch all products", products });
  } catch (error) {
    console.error("error to fetch product", error);
    return res.status(500).json({ status: 500, msg: "error to fetch product" });
  }
};
const getTopSellingproducts = async (req, res) => {
  try {
    const products = await Product.find({ productType: "topSelling" });
    return res
      .status(200)
      .json({ status: 200, msg: "fetch all products", products });
  } catch (error) {
    console.error("error to fetch product", error);
    return res.status(500).json({ status: 500, msg: "error to fetch product" });
  }
};
const getOneproduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res
      .status(200)
      .json({ status: 200, msg: "one product selected", product });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "product fetch errorr" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id); 
    return res
      .status(200)
      .json({ status: 200, msg: "delete successfully", deleteProduct });
  } catch (error) {
    return res.status(500).json({ status: 500, msg: "delete error" });
  }
};
const editProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      size: req.body.size,
      color: req.body.color,
      productType: req.body.productType,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updateProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updateProduct) {
      return res.status(400).json({ status: 400, msg: "Product not found" });
    }

    return res.status(200).json({
      status: 200,
      msg: "Product updated successfully",
      updateProduct,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Update failed" });
  }
};

module.exports = {
  createProduct,
  getAllproducts,
  getOneproduct,
  deleteProduct,
  editProduct,
  getNewArrivalproducts,
  getTopSellingproducts,
};
