import brypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../model/User.js";
import {
  CartModel as Cart,
  CartDetailModel as CartDetail,
} from "../model/Cart.js";
import config from "../config/index.js";

function encodedToken(userID) {
  return jwt.sign(
    {
      iss: "Tien Thanh", // người khởi tạo
      sub: userID, // thông tin định danh(duy nhất) user
      iat: new Date().getTime(), // ngày khởi tạo (NumbericDate)
      exp: new Date().setDate(new Date().getDate() + 3), // hết hạn token (vd: 3days)
    },
    config.JWT_SECRET //secret key
  );
}

export const signIn = async (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user, err) => {
    if (err) return res.status(500).json({ title: "server error", error: err });
    //user not exist
    if (!user)
      return res.status(401).json({ error: { message: "User not found." } });

    if (req.headers.role === "admin" && user.role !== req.headers.role)
      return res
        .status(401)
        .json({ error: { message: "Account has no permissions" } });

    // incorrect password
    if (!brypt.compareSync(req.body.password, user.password))
      return res.status(401).json({
        error: { message: "Login failed! Incorrect password." },
      });

    if (!user.open)
      return res
        .status(401)
        .json({ error: { message: "Your account has been locked" } });

    // set token
    const token = encodedToken(user._id);
    //token được gửi vào Header
    return res.status(200).json({ message: "Login successfully.", token });
  });
};
export const signUp = async (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      // encode password
      req.body.password = brypt.hashSync(req.body.password, 10);

      User.create(req.body).then(async (user) => {
        await Cart.create({ userId: user._id });
        res.send({
          success: true,
          message: "SignUp successfully.",
        });
      });
    } else
      res.status(400).json({
        error: { message: "Email is already in use." },
      });
  });
};

export const secret = async (req, res, next) => {
  let token = req.headers.authoriztion;
  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      console.log(decoded);
      User.findById(decoded.sub, async (err, user) => {
        if (user) {
          const cartId = await Cart.findOne({ userId: user._id }).select("_id");
          return res.send({
            id: user._id,
            cartId: cartId._id,
            name: user.name,
            role: user.role,
          });
        }
        res.send({ message: "not found user" });
      });
    }
  });
};

export const checkAdmin = async (req, res, next) => {
  let token = req.headers.authoriztion;
  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      User.findById(decoded.sub, async (err, user) => {
        await Cart.findOne({ userId: user._id }).select("_id");
        res.send({ role: user.role });
      });
    }
  });
};
export const getAll = async (re, res) => {
  User.find({ role: "user" })
    .sort({ updatedAt: 1 })
    .then((users) => res.send(users))
    .catch((e) => res.send(e));
};
export const deleteOne = async (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndDelete(userId)
    .then(async () => {
      Cart.findOneAndDelete({ userId }).then((cart) => {
        cart.details.forEach(async (item) => {
          await CartDetail.findByIdAndDelete(item);
        });
      });
      res.send({ message: "Delete user successfully." });
    })

    .catch((e) => res.send(e));
};
export const update = async (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, req.body)
    .then(() => res.send({ message: "Update user successfully." }))
    .catch((e) => res.send(e));
};
export const search = async (req, res, next) => {
  const value = req.query.data;
  await User.find({
    $or: [
      { name: { $regex: new RegExp(value), $options: "i" } },
      { email: { $regex: new RegExp(value), $options: "i" } },
    ],
  })
    .then((user) => res.send(user))
    .catch((e) => res.send(e));
};
export const changePw = async (req, res, next) => {
  let token = req.headers.authoriztion;
  let oldPw = req.body.params.data.old;
  let newPw = req.body.params.data.new;
  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      User.findById(decoded.sub, async (err, user) => {
        if (!brypt.compareSync(oldPw, user.password))
          return res.status(401).json({
            error: { message: "Incorrect old password." },
          });
        newPw = brypt.hashSync(newPw, 10);
        User.updateOne({ _id: decoded.sub }, { password: newPw }).then(
          (message) => res.send({ message: 123 })
        );
      });
    }
  });
};
