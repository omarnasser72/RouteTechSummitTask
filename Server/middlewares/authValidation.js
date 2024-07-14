import { body } from "express-validator";

export const validateSignup = [
  body("username")
    .notEmpty()
    .withMessage("Please, enter username.")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can contain only letters, numbers, underscores, and hyphens."
    )
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters long."),
  body("name")
    .notEmpty()
    .withMessage("Please, enter name.")
    .matches(/^[A-Za-z]+$/)
    .withMessage("name has to contain alphabet characters only.")
    .isLength({ min: 3, max: 15 })
    .withMessage("Please, name must to be between 3 and 15 characters.")
    .toLowerCase(),
  body("email")
    .notEmpty()
    .withMessage("Please, enter email.")
    .isEmail()
    .withMessage("Enter valid email.")
    .isLength({ min: 5, max: 20 })
    .withMessage("Please, email must be between 5 and 20 characters."),
  body("password")
    .notEmpty()
    .withMessage("Please, enter password.")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
];

export const validateLogin = [
  body("username")
    .notEmpty()
    .withMessage("Please, enter username.")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Username can contain only letters, numbers, underscores, and hyphens."
    )
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters long."),
  body("password")
    .notEmpty()
    .withMessage("Please, enter password.")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
];
