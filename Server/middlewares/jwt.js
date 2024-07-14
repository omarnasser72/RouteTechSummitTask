import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const signToken = (user) => {
  const token = jwt.sign(user, process.env.JWT);
  return token;
};

export const verifyToken = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies["token"], process.env.JWT);
    if (!decoded) next(createError(400, "Invalid token."));
    next();
  } catch (error) {
    if (error.message.includes("token"))
      return next(createError(403, "Invalid token."));
    next(error);
  }
};

export const verifyOwnUserToken = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies["token"], process.env.JWT);

    console.log("decoded: ", decoded._id);
    console.log("id: ", req.body.userId);

    if (!(decoded?._id === req.body.userId))
      return next(
        createError(401, "You'ren't authorized to use userId that's not yours.")
      );
    next();
  } catch (error) {
    next(error);
  }
};
