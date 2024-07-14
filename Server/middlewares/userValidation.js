import { createError } from "../utils/error.js";

export const validateUserId = (error, req, res, next) => {
  if (
    (error.name === "CastError" && error.kind === "ObjectId") ||
    error.message.includes("User")
  ) {
    return next(createError(400, "User Id doesn't exist."));
  }
  next();
};
