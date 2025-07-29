const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { generateJWTToken } = require("../middleware/auth");

const register = async (req, res) => {
  try {
    const {
      fullName,
      number,
      email,
      password,
      confirmPassword,
      role = "user",
    } = req.body;

    if (!fullName || !number || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ msg: "All fields are required", status: 400 });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res
        .status(400)
        .json({ msg: "Email is Already used", status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      number,
      email,
      password: hashedPassword,
      role,
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      to: email,
      subject: "Your Registration Detail",
      html: `<!DOCTYPE html>
<html>

  <body>
    <div class="container">
      <h1>Welcome,${fullName}!</h1>
      <p>Thank you for registering on <strong>SHOP.IN</strong>. We're excited to have you with us!</p>

      <div class="info">
        <p><strong>Here are your registration details:</strong></p>
        <p><strong>Name:</strong>${fullName}</p>
        <p><strong>Email:</strong>${email}</p>
        <p><strong>Phone:</strong>${number}</p>
      </div>

      <p>You can now log in and start using all the features available to you.</p>

      <p>If you have any questions or need help, feel free to reply to this email or contact our support team.</p>

      <p>Cheers, <br/>The SHOP.IN Team</p>

      <div class="footer">
        <p>This is an automated message. Please do not reply directly to this email.</p>
      </div>
    </div>
  </body>
</html>
`,
    });

    return res
      .status(201)
      .json({ status: 200, msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ status: 500, msg: "Registration Failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(400).json({ status: 400, msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (!isMatch) {
      return res.status(400).json({ status: 400, msg: "Invalid credentials" });
    }

    const user = {
      id: userDetails.id,
      fullName: userDetails.fullName,
      email: userDetails.email,
      number: userDetails.number,
      role: userDetails.role,
    };
    const token = generateJWTToken(user);

    return res
      .status(200)
      .json({ status: 200, msg: "User login successfully", user, token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ status: 500, msg: "Login Failed" });
  }
};
const profileDetail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ status: 500, message: "Error fetching user" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const updateData = {
      fullName: req.body.fullName,
      number: req.body.number,
      email: req.body.email,
      address: req.body.address,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updateUser = await User.findByIdAndUpdate(id, updateData, {
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    console.log(req.body);
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res
        .status(500)
        .json({ status: false, msg: "Email is not found !" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.resetToken = token;
    await user.save();
    console.log(user);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const resetLink = `${process.env.REACTBASE_URL}/resetPaasword?token=${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Reset your Password",
      html: ` For reset Password:<a href="${resetLink}"><h1>Click here</h1></a>`,
    });
    res.json({ msg: "Password reset email sent" });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "reset password error" });
  }
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    console.log(token);
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(500).json({ status: false, msg: "invalid user" });
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      return res
        .status(400)
        .json({ msg: "New password must be different from the old password." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    await user.save();
    return res
      .status(200)
      .json({ status: true, msg: "password update successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Password update error" });
  }
};

module.exports = {
  register,
  login,
  profileDetail,
  updateProfile,
  forgotPassword,
  resetPassword,
};
