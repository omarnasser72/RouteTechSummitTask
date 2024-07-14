import { body, oneOf } from "express-validator";
import { createError } from "../utils/error.js";

export const validateTask = [
  body("title")
    .notEmpty()
    .withMessage("Please, enter task title.")
    .isLength({ min: 3, max: 15 })
    .withMessage("Task title has to be between 3 and 15 characters."),
  body("description")
    .notEmpty()
    .withMessage("Please, enter task description.")
    .isLength({ min: 3 })
    .withMessage("Task description has to be at least 3 characters."),
  body("shared")
    .notEmpty()
    .withMessage("Please, enter task shared option.")
    .isBoolean()
    .withMessage("Shared option has to be true or false only."),
  body("categoryId")
    .notEmpty()
    .withMessage("Please, enter categoryId.")
    .isMongoId()
    .withMessage("Enter valid categoryId"),
  body("userId")
    .notEmpty()
    .withMessage("Please, enter userId.")
    .isMongoId()
    .withMessage("Enter valid userId"),
];
export const validateTaskOptional = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Please, enter task title.")
    .isLength({ min: 3, max: 15 })
    .withMessage("Task title has to be between 3 and 15 characters."),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Please, enter task description.")
    .isLength({ min: 3 })
    .withMessage("Task description has to be at least 3 characters."),
  body("shared")
    .optional()
    .notEmpty()
    .withMessage("Please, enter task shared option.")
    .isBoolean()
    .withMessage("Shared option has to be true or false only."),
  body("categoryId")
    .optional()
    .notEmpty()
    .withMessage("Please, enter categoryId.")
    .isMongoId()
    .withMessage("Enter valid categoryId"),
  body("userId")
    .notEmpty()
    .withMessage("Please, enter userId.")
    .isMongoId()
    .withMessage("Enter valid userId"),
];
export const validateTaskType = [
  // oneOf(
  //   [body("type").equals("textTask"), body("type").equals("listTask")],
  //   `Type has to be "textTask" or "listTask".`
  // ),
];

export const validateTaskId = (error, req, res, next) => {
  if (
    (error.name === "CastError" && error.kind === "ObjectId") ||
    error.message.includes("TextTask")
  ) {
    return next(createError(400, "Task Id doesn't exist."));
  }
  next();
};

export const validateTextTask = [
  body("textBody")
    .notEmpty()
    .withMessage("Please, enter Text Body.")
    .isLength({ min: 3 })
    .withMessage("Text Body has to be at least 3 characters."),
];

export const validateTextTaskOptional = [
  body("textBody")
    .optional()
    .notEmpty()
    .withMessage("Please, enter Text Body.")
    .isLength({ min: 3 })
    .withMessage("Text Body has to be at least 3 characters."),
];

export const validateListTask = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items have to be non-empty array."),
  body("items.*.textBody")
    .notEmpty()
    .withMessage("Please, enter Text Body.")
    .isLength({ min: 3 })
    .withMessage("Text Body has to be at least 3 characters."),
];

export const validateListTaskOptional = [
  body("items")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Items have to be non-empty array."),
  body("items.*.textBody")
    .optional()
    .notEmpty()
    .withMessage("Please, enter Text Body.")
    .isLength({ min: 3 })
    .withMessage("Text Body has to be at least 3 characters."),
];

export const validateTaskUserId = [
  body("userId")
    .notEmpty()
    .withMessage("Please, enter userId.")
    .isMongoId()
    .withMessage("Enter valid userId"),
];
