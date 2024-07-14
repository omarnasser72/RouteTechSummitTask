import Express from "express";
import { login, signup } from "../controllers/authController.js";
import {
  validateLogin,
  validateSignup,
} from "../middlewares/authValidation.js";
import { validationHandler } from "../middlewares/generalValidation.js";

const router = Express.Router();

router.post("/signup", validateSignup, validationHandler, signup);

router.post("/login", validateLogin, validationHandler, login);

export default router;
