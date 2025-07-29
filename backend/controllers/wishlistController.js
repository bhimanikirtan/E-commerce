const Likes = require("../models/wishlist");

const addWishlist = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const newLike = new Likes({ userId, productId });
    await newLike.save();
    return res
      .status(201)
      .json({ msg: "Add to wishList successfully", status: true });
  } catch (error) {
    console.error("Wishlist Error:", error);
    return res
      .status(500)
      .json({ status: false, msg: "Failed to like product" });
  }
};
const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const userLikes = await Likes.find({ userId: userId }).populate(
      "productId"
    );
    return res.status(200).json({
      status: 200,
      msg: "Fetch All UserLikes successfully",
      userLikes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: "Error for fetch Likes" });
  }
};
const deleteUserWishlist = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    const findId = await Likes.findOne({
      userId: userId,
      productId: productId,
    });
    if (findId) {
      const userLikes = await Likes.findByIdAndDelete(findId._id);
      return res
        .status(200)
        .json({ status: 200, msg: "Remove from wishList", userLikes });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: "Error for Remove Likes" });
  }
};

module.exports = { addWishlist, getUserWishlist, deleteUserWishlist };
