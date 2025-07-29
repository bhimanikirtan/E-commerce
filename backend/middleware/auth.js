const jwt = require("jsonwebtoken");
const User = require("../models/user");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    req.user = null;
    return next();
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: 403, msg: "Error in  Token Verify" });
    if (!user || user.isBlocked) {
      return res.status(500).json({ status: false, msg: "User is Blocked" });
    }
    req.user = user;
    next();
  });
}
function generateJWTToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

const checkBlockUser = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const checkUser = await User.findById(userId);
    if (!checkUser) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    if (checkUser.isBlocked) {
      return res.status(403).json({ status: false, msg: "User is Blocked" });
    }
    next();
  } catch (err) {
    console.error("Error in checkBlockUser:", err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};
// const checkUser=async ()=>{
//     try{
//         const findUser= localStorage.getItem("")
//     }
// }

module.exports = {
  verifyToken,
  generateJWTToken,
  checkBlockUser,
};
