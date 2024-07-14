import Express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyToken } from "../middlewares/jwt.js";
import { validationHandler } from "../middlewares/generalValidation.js";
import { validateCategory } from "../middlewares/categoryValidation.js";

const router = Express.Router();

//add category
router.post(
  "",
  verifyToken,
  validateCategory,
  validationHandler,
  createCategory
);

//update category
router.patch(
  "",
  verifyToken,
  validateCategory[0],
  validationHandler,
  updateCategory
);

//get one category or all based on passed queries
router.get("", verifyToken, validationHandler, getCategory);

//delete category
router.delete("", verifyToken, validationHandler, deleteCategory);

export default router;
