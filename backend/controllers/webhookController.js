const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");
const nodemailer = require("nodemailer");

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const subscriptionType = session.amount_total;
      const subscribeId = session.subscription;
      const userId = session.client_reference_id;
      const orderId = session.metadata.orderId;
      try {
        const user = await User.findById(userId);
        if (user) {
          if (subscriptionType == 49900) {
            user.isSubscribe = "premium";
          } else {
            user.isSubscribe = "basic";
          }
          user.subscriptionId = subscribeId;
          await user.save();
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
          await transporter.sendMail({
            to: user.email,
            subject: "Welcome to Premium",
            html: "<h1>Thank you for subscribing!</h1>",
          });
        }
        const order = await Order.findById(orderId)
          .populate("userId")
          .populate("orderData.products.productId");
        if (order) {
          if (order.paymentDetail?.paymentStatus !== "complete") {
            order.paymentDetail = {
              paymentIntentId: session.payment_intent,
              paymentMode: session.payment_method_types[0],
              paymentStatus: session.status,
            };

            await order.save();
            const cart = await Cart.findOne({ userId: order.userId });
            if (cart) {
              cart.products = [];
              cart.total = 0;
              await cart.save();
            }
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

            const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
            });
            await transporter.sendMail({
              to: order.userId.email,
              subject: "🧾 Your Order Details - SHOP.IN",
              html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f7f7; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <div style="text-align: center;">
        <h1 style="color: #A66914;">SHOP.IN</h1>
        <h2 style="color: #4caf50;">Thank you for your order, ${
          order.userId.fullName
        }!</h2>
        <p style="font-size: 16px; color: #333;">Order placed on: <strong>${new Date(
          order.createdAt
        ).toLocaleString()}</strong></p>
      </div>

      <div style="margin-top: 20px;">
        <h3 style="color: #555;">📦 Shipping Address</h3>
        <p style="line-height: 1.6;">
          ${order.info.address},<br/>
          ${order.info.city} - ${order.info.pincode},<br/>
          ${order.info.country}
        </p>
      </div>

      <hr style="margin: 30px 0;"/>

      <div>
        <h3 style="color: #555;">🛒 Order Summary</h3>
        ${productList}
      </div>

      <hr style="margin: 30px 0;"/>

      <div style="font-size: 16px; color: #333;">
        <p><strong>Total:</strong> ₹${order.total}</p>
        <p><strong>Order Status:</strong> <span style="color: orange; font-weight: bold;">${
          order.status
        }</span></p>
        <p><strong>Payment ID:</strong> ${
          order.paymentDetail.paymentIntentId
        }</p>
        <p><strong>Payment Status:</strong> <span style="color: green; font-weight: bold;">${
          order.paymentDetail.paymentStatus
        }</span></p>
        <p><strong>Payment Mode:</strong> <span style="color: red; font-weight: bold;">${
          order.paymentDetail.paymentMode
        }</span></p>
      </div>

      <div style="margin-top: 30px;">
        <p style="font-size: 15px;">We'll notify you once your items are shipped. Thank you for shopping with <strong>SHOP.IN</strong>!</p>
      </div>

      <div style="margin-top: 40px; font-size: 12px; color: #777; text-align: center;">
        <p>This is an automated message. Please do not reply.</p>
        <p>&copy; ${new Date().getFullYear()} SHOP.IN</p>
      </div>
    </div>
  </div>
  `,
            });
          }
        }
      } catch (err) {
        console.error("Order update failed", err);
      }
      break;
    case "customer.subscription.updated":
      const updatedSubscription = event.data.object;
      const subscribType = updatedSubscription.plan.amount;
      const customerId = updatedSubscription.customer;
      const customer = await stripe.customers.retrieve(customerId);
      console.log("customer", customer);
      try {
        const userId = customer.metadata.userId;

        const user = await User.findById(userId);
        if (user) {
          if (updatedSubscription.cancel_at_period_end) {
            user.isSubscribe = "free";
            user.subscriptionId = null;
          } else {
            if (subscribType == 49900) {
              user.isSubscribe = "premium";
            } else {
              user.isSubscribe = "basic";
            }
            user.subscriptionId = updatedSubscription.id;
          }

          await user.save();

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          await transporter.sendMail({
            to: user.email,
            subject: "Welcome to SHOP.IN",
            html: "<h1>Thank you for Updating your subscription!</h1>",
          });
        }
      } catch (err) {
        console.error("Order update failed", err);
      }
      break;
  }
  res.status(200).json({ received: true });
};

module.exports = { webhook };
