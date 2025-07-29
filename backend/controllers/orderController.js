const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");
const nodemailer = require("nodemailer");

const addOrder = async (req, res) => {
  try {
    const { address, pincode, city, country } = req.body;
    const id = req.user.id;

    if (!address || !pincode || !city || !country) {
      return res
        .status(400)
        .json({ status: false, msg: "Please Select Address" });
    }

    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(404).json({ status: false, msg: "User not found!" });
    }

    const cart = await Cart.findOne({ userId: id }).populate(
      "products.productId"
    );
    if (!cart || cart.products.length === 0) {
      return res
        .status(400)
        .json({ status: false, msg: "Cart is empty or not found!" });
    }

    const newOrder = new Order({
      userId: id,
      orderData: { products: cart.products },
      total: cart.total,
      info: {
        country,
        address,
        pincode,
        city,
      },
      status: "pending",
    });

    await newOrder.save();

    return res.status(201).json({
      status: true,
      message: "Order created",
      orderId: newOrder._id,
    });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Order error", error });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    const orders = await Order.find({
      userId: userId,
      status: { $in: ["pending", "delivered", "canceled"] },
    }).populate("orderData.products.productId");
    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orders,
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
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(orderId);
    const order = await Order.findOne({ _id: orderId }).populate(
      "orderData.products.productId userId"
    );
    console.log(order);
    const pending = order.status == "pending";
    const productList = order.orderData.products
      .map((product) => {
        return `
      <div style="padding: 12px; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 15px; background-color: #f9f9f9;">
        <h4 style="margin: 0 0 8px 0;">🛍️ ${product?.productId?.name}</h4>
        <p style="margin: 4px 0;">Quantity: <strong>${product?.quantity}</strong></p>
        <p style="margin: 4px 0;">Size: <strong>${product?.size}</strong></p>
        <p style="margin: 4px 0;">Color: <strong>${product?.color}</strong></p>
        <p style="margin: 4px 0;">Price: <strong>₹${product?.productId?.price}</strong></p>
      </div>
    `;
      })
      .join("");

    if (pending) {
      const updateOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: "canceled" },
        { new: true }
      );

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        to: order.userId.email,
        subject: "❌ Your SHOP.IN Order Has Been Canceled",
        html: `
  <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #d32f2f; margin: 0;">SHOP.IN</h1>
      <p style="font-size: 16px; color: #888;">Premium Online Shopping Experience</p>
    </div>

    <h2 style="color: #d32f2f;">🚫 Order Canceled</h2>
    <p style="font-size: 16px;">Dear <strong>${
      order.userId.fullName
    }</strong>,</p>
    <p style="font-size: 15px;">We're sorry to inform you that your order placed on <strong>${new Date(
      order.createdAt
    ).toDateString()}</strong> has been <span style="color: red;"><strong>canceled</strong></span>.</p>

    <hr style="margin: 20px 0;" />
    <div>${productList}</div>
    <hr style="margin: 20px 0;" />

    <p style="font-size: 16px;"><strong>Total Amount:</strong> ₹${
      order.total
    }</p>
    <p style="font-size: 16px;"><strong>Order Status:</strong> <span style="color: red; font-weight: bold;">${
      updateOrder.status
    }</span></p>

    <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-left: 5px solid #ffeeba; border-radius: 6px;">
      <p style="margin: 0; font-size: 15px;">We hope to serve you again in the future. If you have any questions, feel free to reply to this email.</p>
    </div>

    <p style="margin-top: 40px; font-size: 14px; color: #888;">This is an automated email from <strong>SHOP.IN</strong>. Please do not reply directly to this email.</p>
  </div>
`,
      });

      return res
        .status(200)
        .json({ status: true, msg: "order canceled", updateOrder });
    } else {
      return res.status(500).json({ status: false, msg: "Order not Canceled" });
    }
  } catch (error) {
    console.error("Error cancel order:", error);
    return res.status(500).json({
      status: false,
      msg: "Failed to cancel order",
      error: error.message,
    });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  cancelOrder,
};
