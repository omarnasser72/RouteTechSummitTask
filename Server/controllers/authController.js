import bcrypt from "bcrypt";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { signToken } from "../middlewares/jwt.js";

export const signup = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(createError(403, "email already exists!"));

    user = await User.findOne({ username });

    if (user) return next(createError(403, "username already exists!"));

    const hashedPass = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      name,
      email,
      password: hashedPass,
    });

    user = {
      username,
      name,
      email,
    };

    const savedUser = await newUser.save();

    if (!savedUser) return next(createError(500, "User couldn't be saved"));

    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) return next(createError(400, "username doesn't exist."));

    if (!bcrypt.compareSync(password, user.password))
      return next(createError(401, "wrong password."));

    user = user.toObject();
    delete user.__v;
    delete user.password;

    const token = signToken(user);

    res.status(200).cookie("token", token).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
