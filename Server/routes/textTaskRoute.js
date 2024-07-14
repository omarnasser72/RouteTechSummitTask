import Express from "express";
import {
  createTextTask,
  updateTextTask,
  getTextTask,
  deleteTextTask,
  getTextTaskWithSharedOption,
  getTextTaskWithCategoryName,
} from "../controllers/textTaskController.js";
import { validationHandler } from "../middlewares/generalValidation.js";
import {
  validateTask,
  validateTextTask,
  validateTaskOptional,
  validateTextTaskOptional,
  validateTaskUserId,
} from "../middlewares/taskValidation.js";
import { verifyOwnUserToken, verifyToken } from "../middlewares/jwt.js";
const router = Express.Router();

//add text task
router.post(
  "",
  verifyToken,
  validateTask,
  validateTextTask,
  verifyOwnUserToken,
  validationHandler,
  createTextTask
);

//update text task
router.patch(
  "",
  verifyToken,
  validateTaskOptional,
  validateTextTaskOptional,
  validateTaskUserId,
  verifyOwnUserToken,
  validationHandler,
  updateTextTask
);

//get text task
router.get("", verifyToken, validationHandler, getTextTask);

//delete text task
router.delete("", verifyToken, validationHandler, deleteTextTask);

//get text task using shared filter option
router.get(
  "/sharedOption",
  verifyToken,
  validationHandler,
  getTextTaskWithSharedOption
);

//get text task using category name filter option
router.get(
  "/categoryOption",
  verifyToken,
  validationHandler,
  getTextTaskWithCategoryName
);

export default router;
