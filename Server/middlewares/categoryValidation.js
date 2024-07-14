import { body } from "express-validator";
import { createError } from "../utils/error.js";

export const validateCategory = [
  body("name")
    .notEmpty()
    .withMessage("Please, enter category name.")
    .isLength({ min: 3, max: 15 })
    .withMessage("Category name has to be between 3 and 15 characters."),
  body("userId").isMongoId().withMessage("Please, enter valid userId"),
];

export const validateCategoryId = (error, req, res, next) => {
  console.log(error);
  if (
    error.name === "CastError" &&
    error.kind === "ObjectId" &&
    error.message.includes("Category")
  ) {
    return next(createError(400, "Category Id doesn't exist."));
  }
  next();
};
