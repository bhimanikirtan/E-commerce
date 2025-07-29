const Cart = require("../models/cart");
const User = require("../models/user");
const Product = require("../models/product");

const createCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    const id = req.user.id;

    if (!productId) {
      return res
        .status(400)
        .json({ status: false, message: "productId are required" });
    }

    const findUser = await User.findById(id);

    if (!findUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user ID" });
    }

    const findProduct = await Product.findById(productId);
    if (!findProduct) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid product ID" });
    }

    const cart = await Cart.findOne({ userId: id });

    const productPrice = findProduct.price;
    const itemTotal = productPrice * quantity;

    if (!cart) {
      const newCart = new Cart({
        userId: id,
        products: [{ productId, quantity, size, color }],
        total: itemTotal,
      });

      await newCart.save();
      return res.status(201).json({
        status: true,
        message: "Cart created and product added",
        newCart,
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity, color, size });
      }

      cart.total += itemTotal;

      await cart.save();
      return res
        .status(200)
        .json({ status: true, message: "Cart updated", cart });
    }
  } catch (error) {
    console.error("add Product Error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Add to cart failed" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const id = req.user.id;
    const cartItems = await Cart.findOne({ userId: id }).populate(
      "products.productId"
    );

    return res
      .status(200)
      .json({ status: 200, msg: "fetch all cart", cartItems });
  } catch (error) {
    console.error("error to fetch product", error);
    return res.status(500).json({ status: 500, msg: "error to fetch product" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const id = req.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ userId: id }).populate(
      "products.productId"
    );
    if (!cart) {
      return res.status(404).json({ status: 404, msg: "Cart not Found" });
    }

    const product = cart.products.findIndex((prod) => prod.id === productId);

    if (product === -1) {
      return res.status(404).send("Item not found in cart");
    }
    const cartPrice =
      cart.products[product].productId.price * cart.products[product].quantity;

    cart.products.splice(product, 1);
    cart.total -= cartPrice;

    await cart.save();
    return res
      .status(200)
      .json({ ststus: 200, msg: "Product remove from cart", cart });
  } catch (error) {
    console.error("delete error", error);
    return res.status(500).json({ status: 500, msg: "Delete error" });
  }
};
const clearCart = async (req, res) => {
  try {
    const id = req.user.id;

    const cart = await Cart.findOne({ userId: id }).populate(
      "products.productId"
    );
    if (!cart) {
      return res.status(404).json({ status: 404, msg: "Cart not Found" });
    }

    cart.products = [];
    cart.total = "0";
    await cart.save();

    return res
      .status(200)
      .json({ status: 200, msg: "All products removed from cart", cart });
  } catch (error) {
    console.error("delete error", error);
    return res.status(500).json({ status: 500, msg: "Delete error" });
  }
};
const plusProduct = async (req, res) => {
  try {
    const id = req.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ userId: id }).populate(
      "products.productId"
    );
    if (!cart) {
      return res.status(404).json({ status: 404, msg: "Cart not Found" });
    }
    const product = cart.products.findIndex((prod) => prod.id === productId);

    cart.products[product].quantity += 1;
    const price = cart.products[product].productId.price;
    cart.total += price;
    await cart.save();
    return res.status(200).json({ status: 200, msg: "quantity updated", cart });
  } catch (error) {
    console.error("delete error", error);
    return res.status(500).json({ status: 500, msg: "error" });
  }
};
const minusProduct = async (req, res) => {
  try {
    const id = req.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ userId: id }).populate(
      "products.productId"
    );
    if (!cart) {
      return res.status(404).json({ status: 404, msg: "Cart not Found" });
    }
    const product = cart.products.findIndex((prod) => prod.id === productId);

    if (product !== 1 && cart.products[product].quantity > 1) {
      cart.products[product].quantity -= 1;
      const price = cart.products[product].productId.price;
      cart.total -= price;
    }
    await cart.save();
    return res.status(200).json({ status: 200, msg: "quantity updated", cart });
  } catch (error) {
    console.error("delete error", error);
    return res.status(500).json({ status: 500, msg: "error" });
  }
};

module.exports = {
  createCart,
  getAllCart,
  removeFromCart,
  clearCart,
  plusProduct,
  minusProduct,
};
