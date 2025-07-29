const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");
const nodemailer = require("nodemailer");

const getAllOrdersAdmin = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const orders = await Order.find(query).populate(
      "orderData.products.productId userId"
    );

    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      status: false,
      msg: "Failed to fetch orders",
      error: error.message,
    });
  }
};
const updateOrdersAdmin = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId }).populate(
      "orderData.products.productId userId"
    );
    const pending = order.status == "pending";
    const productList = order.orderData.products
      .map((product) => {
        return `
      <div style="padding: 10px; border: 1px solid #ddd; margin-bottom: 10px;">
        <p><strong>${product?.productId?.name}</strong></p>
        <p>Quantity: <strong>${product?.quantity}</strong></p>
        <p>Size: <strong>${product?.size}</strong></p>
        <p>Color: <strong>${product?.color}</strong></p>
        <p>Price: <strong>₹${product?.productId?.price}</strong></p>
      </div>
    `;
      })
      .join("");

    // ✅ Only run if pending === true (means we are delivering now)
    if (pending) {
      const updateOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: "delivered" },
        { new: true }
      );

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const emailHtml = `
    <div style="font-family: Arial, sans-serif;">
      <h2>📦 Your order has been <span style="color: green;">Delivered</span>, ${order.userId.fullName}!</h2>
      
      <p><strong>Delivered to:</strong> ${order.info.address}, ${order.info.city}, ${order.info.pincode}, ${order.info.country}</p>
      
      <hr />
      ${productList}
      <hr />
      
      <p><strong>Total:</strong> ₹${order.total}</p>
      <p>Your Order Status is: 
        <span style="font-size: 20px; font-weight: bold; color: green;">
          DELIVERED
        </span>
      </p>
      
      <p>Thank you for shopping with us!</p>
    </div>
  `;

      await transporter.sendMail({
        to: order.userId.email,
        subject: "✅ Your Order has been Delivered!",
        html: emailHtml,
      });

      return res
        .status(200)
        .json({ status: true, msg: "order updated", updateOrder });
    } else {
      return res.status(500).json({ status: false, msg: "Order not Update" });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      status: false,
      msg: "Failed to fetch orders",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    return res.status(200).json({ status: 200, msg: "fetch all users", users });
  } catch (error) {
    console.error("error to fetch product", error);
    return res.status(500).json({ status: 500, msg: "error to fetch users" });
  }
};
const updateUserByAdmin = async (req, res) => {
  try {
    const userID = req.params.id;
    const updateData = {
      fullName: req.body.fullName,
      number: req.body.number,
      email: req.body.email,
      address: req.body.address,
    };
    const findUser = await User.findById(userID);
    if (!findUser) {
      return res.status(500).json({ status: false, msg: "User is not found" });
    }
    if (req.file) {
      updateData.image = req.file.path;
    }
    const updateUser = await User.findByIdAndUpdate(userID, updateData, {
      new: true,
    });
    if (!updateUser) {
      return res.status(400).json({ status: 400, msg: "User not found" });
    }
    return res.status(200).json({
      status: 200,
      msg: "UserProfile updated successfully",
      updateUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, msg: "ProfileUpdate Failed" });
  }
};
const getAllCount = async (req, res) => {
  try {
    const users = await User.countDocuments({ role: "user" });

    const orders = await Order.countDocuments({});

    const product = await Product.countDocuments({});

    return res
      .status(200)
      .json({ status: 200, msg: "fetch all users", users, orders, product });
  } catch (error) {
    console.error("error to fetch product", error);
    return res.status(500).json({ status: 500, msg: "error to fetch users" });
  }
};
const blockUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return res.status(500).json({ status: false, msg: "User is not found" });
    }
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );
    return res
      .status(200)
      .json({ status: true, msg: "user Bloked successfully", updateUser });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "User block error" });
  }
};
const getAnalyticsData = async (req, res) => {
  try {
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const userGrowth = await User.aggregate([
      {
        $match: {
          role: "user",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const orderStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productStatus = await Product.aggregate([
      {
        $match: {
          stock: { $lt: 100 },
        },
      },
      {
        $group: {
          _id: "$name",
          stock: { $sum: "$stock" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          stock: 1,
        },
      },
    ]);
    // console.log(productStatus);
    // console.log(monthlySales);
    // console.log(userGrowth);
    // console.log(orderStatus);

    res.json({ productStatus, monthlySales, userGrowth, orderStatus });
  } catch (err) {
    res.status(500).json({ error: "Failed to get analytics data" });
  }
};

module.exports = {
  getAllOrdersAdmin,
  updateOrdersAdmin,
  getAllUsers,
  updateUserByAdmin,
  getAllCount,
  blockUser,
  getAnalyticsData,
};
