const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order");
const path = require("path");
const fs = require("fs");
const generatePDF = require("../util/pdfDownload");
const sendEmail = require("../util/sendEmail");
const payment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate(
      "orderData.products.productId"
    );
    if (!order) return res.status(404).json({ msg: "Order not found" });

    const line_items = order.orderData.products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.productId.name,
        },
        unit_amount: product.productId.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.REACTBASE_URL}/orderSuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REACTBASE_URL}/checkOut`,
      metadata: { orderId: order._id.toString() },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    res.status(500).json({ msg: "Payment failed" });
  }
};
const invoice = async (req, res) => {
  try {
    const id = req.params.session_id;
    const session = await stripe.checkout.sessions.retrieve(id);
    const orderID = session.metadata.orderId;

    const order = await Order.findById(orderID)
      .populate("userId")
      .populate("orderData.products.productId");

    const invoiceDir = path.join(__dirname, "invoices");
    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir);
    }

    const invoicePath = path.join(invoiceDir, `${orderID}.pdf`);

    if (!fs.existsSync(invoicePath)) {
      await generatePDF(order, invoicePath);
    }

    await sendEmail(order.userId.email, invoicePath);

    fs.readFile(invoicePath, (err, data) => {
      if (err) {
        console.error("Read error:", err);
        return res.status(500).send("Could not read invoice.");
      }

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${orderID}.pdf"`,
      });

      res.send(data);

      fs.unlink(invoicePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete invoice:", unlinkErr);
        }
      });
    });
  } catch (err) {
    console.error("Invoice error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleSubscription = async (req, res) => {
  const { subscribId, userId } = req.body;
  console.log("subscribId", subscribId);

  try {
    if (!subscribId) {
      return res.status(400).json({ error: "Subscription ID is required." });
    }
    const subscription = await stripe.subscriptions.retrieve(subscribId);
    console.log(subscription);
    const customerId = subscription.customer;
    await stripe.customers.update(customerId, {
      metadata: { userId },
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.REACTBASE_URL}/subscribSuccess`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("❌ Portal session creation failed:", error.message);

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  payment,
  handleSubscription,
  invoice,
};
