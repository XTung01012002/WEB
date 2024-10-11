const { userSchema } = require("../models/user.model");
const { BadRequestError } = require("../responseHandle/error.response");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

class UserService {
  static signUp = async (Data) => {
    const { email, password } = Data;
    const user = await userSchema.findOne({ email });

    if (user) {
      throw new BadRequestError("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const payload = {
      ...Data,
      password: hashedPassword,
    };

    const userData = new userSchema(payload);
    await userData.save();
    return userData;
  };

  static signIn = async (Data, res) => {
    const { email, password } = Data;

    const user = await userSchema.findOne({ email });
    if (!user) {
      throw new BadRequestError("Account does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestError("Incorrect password");
    }
    const token = await JWT.sign(
      { _id: user._id, email: user.email },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "15d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return { user, token };
  };

  static userDetail = async (id) => {
    const user = await userSchema.findById(id);
    if (!user) {
      throw new BadRequestError("Account does not exist");
    }
    return user;
  };

  static logOut = async (res) => {
    await res.clearCookie("token");
    return true;
  };

  static allUsers = async () => {
    const user = await userSchema.find();
    return user;
  };

  static updateUser = async (Data) => {
    const sessionUser = Data._id;
    const { userId, email, name, role } = Data;
    const user = await userSchema.findById(sessionUser);
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const updatedUser = await userSchema.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    return updatedUser;
  };

  static requestPasswordReset = async (Data) => {
    const { email } = Data;

    const user = await userSchema.findOne({ email });
    if (!user) {
      throw new BadRequestError("Account does not exist");
    }
    const resetToken = user.createPasswordChangedToken();
    await user.save();

    const html = `Please click on the link below to reset your password. This link will expire in 15 minutes. <a href=${process.env.FRONTEND_URL}/reset-password?token=${resetToken}>Click here</a>`;
    const data = {
      email,
      html,
    };
    const rs = await sendMail(data);
    return rs;
  };

  static resetPassword = async (req) => {
    const { newPassword, confirmPassword } = req.body;
    const tokenReset = req.query?.token;
    const hashedToken = crypto
      .createHash("sha256")
      .update(tokenReset)
      .digest("hex");

    const user = await userSchema.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (newPassword !== confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }
    if (!user) {
      throw new BadRequestError("Invalid or expired token");
    }
    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return user;
  };
}

module.exports = UserService;
