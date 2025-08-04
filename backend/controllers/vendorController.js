const User = require("../models/user");
const VendorDetails = require("../models/vendorDetails");
const Product = require("../models/product");
const addVendorDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const {
      businessname,
      businessemail,
      businessnumber,
      address,
      city,
      state,
      pincode,
      country,
    } = req.body;

    const companylogo = req.file ? req.file.path : null;

    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }
    const newVendor = await VendorDetails.create({
      createdBy: id,
      companylogo,
      businessname,
      businessemail,
      businessnumber,
      businessAddress: {
        address,
        city,
        state,
        pincode,
        country,
      },
    });

    return res.status(201).json({
      status: 201,
      msg: "Vendor Details Created successfully",
      newVendor,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, msg: "vendor detail create error" });
  }
};

const getVendorDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const vendorDetails = await VendorDetails.findOne({
      createdBy: id,
    }).populate("createdBy");
    if (!vendorDetails) {
      return res
        .status(200)
        .json({ status: 200, msg: "Dont have VendorDetails" });
    }
    return res.status(201).json({
      status: 200,
      msg: "vendorDetails fetch successfully",
      vendorDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, msg: "Address fetch Failed" });
  }
};

const updateVendorDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const updatebusinessData = {
      businessname: req.body.businessname,
      businessnumber: req.body.businessnumber,
      businessAddress: {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        country: req.body.country,
      },
    };
    if (req.file) {
      updatebusinessData.companylogo = req.file.path;
    }
    const updateVendorData = {
      fullName: req.body.fullName,
      number: req.body.number,
    };
    const updateVendor = await User.findByIdAndUpdate(id, updateVendorData, {
      new: true,
    });

    const updateVendorbusinessData = await VendorDetails.findOneAndUpdate(
      { createdBy: id },
      updatebusinessData,
      {
        new: true,
      }
    );

    return res.status(201).json({
      status: 201,
      msg: "VendorProfile updated successfully",
      updateVendorbusinessData,
      updateVendor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, msg: "ProfileUpdate Failed" });
  }
};
const getAllVendorProducts = async (req, res) => {
  try {
    const id = req.user.id;
    const findVendor = await VendorDetails.findOne({ createdBy: id });
    const vendorProducts = await Product.find({
      addedBy: findVendor._id,
    }).populate("addedBy");
    console.log(vendorProducts);

    return res.status(201).json({
      status: 201,
      msg: "vendorproduct fetch successfully",
      vendorProducts,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "vendorproduct add failed",
    });
  }
};

module.exports = {
  addVendorDetails,
  getVendorDetails,
  updateVendorDetails,
  getAllVendorProducts,
};
