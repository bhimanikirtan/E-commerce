const Address = require("../models/address");
const User = require("../models/user");

const addAddress = async (req, res) => {
  try {
    const id = req.user.id;
    const { address, city, pincode, country, state } = req.body;
    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }
    const findAddress = await Address.findOne({ userId: id, deletedAt: null });
    const newAddress = await Address.create({
      userId: id,
      address,
      city,
      pincode,
      country,
      state,
      default: !findAddress,
    });

    return res.status(201).json({
      status: 201,
      msg: "Address created successfully",
      newAddress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: "add address error" });
  }
};

const getAllAddress = async (req, res) => {
  try {
    const id = req.user.id;
    const addresses = await Address.find({ userId: id, deletedAt: null });
    if (!addresses) {
      return res.status(200).json({ status: 200, msg: "Dont have Address" });
    }
    return res.status(201).json({
      status: 200,
      msg: "Address fetch successfully",
      addresses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, msg: "Address fetch Failed" });
  }
};
const deleteAddress = async (req, res) => {
  try {
    // const id = req.user.id;
    const addId = req.params.id;
    const deleteAddress = await Address.findOneAndUpdate(
      { _id: addId },
      { deletedAt: Date.now() }
    );

    return res.status(200).json({
      status: 200,
      msg: "Deleted address successfully",
      deleteAddress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: "Delete address error" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      {
        $set: {
          address: req.body.address,
          city: req.body.city,
          pincode: req.body.pincode,
          country: req.body.country,
          state: req.body.state,
        },
      },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ status: 404, msg: "Address not found" });
    }

    return res.status(200).json({
      status: 200,
      msg: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({ status: 500, msg: "Error updating address" });
  }
};

const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await Address.updateMany({ userId }, { $set: { default: false } });

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { $set: { default: true } },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ status: false, msg: "Address not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Default address set successfully",
      data: updatedAddress,
    });
  } catch (error) {
    console.error("Set default failed:", error);
    return res
      .status(500)
      .json({ status: false, msg: "Failed to set default address" });
  }
};

module.exports = {
  addAddress,
  getAllAddress,
  deleteAddress,
  updateAddress,
  setDefaultAddress,
};
