import Express from "express";
import {
  createListTask,
  updateListTask,
  getListTask,
  deleteListTask,
  getListTaskWithSharedOption,
  getListTaskWithCategoryName,
} from "../controllers/listTaskController.js";
import { validationHandler } from "../middlewares/generalValidation.js";
import {
  validateListTask,
  validateListTaskOptional,
  validateTask,
  validateTaskOptional,
  validateTaskUserId,
} from "../middlewares/taskValidation.js";
import { verifyOwnUserToken, verifyToken } from "../middlewares/jwt.js";
const router = Express.Router();

//add list task
router.post(
  "",
  verifyToken,
  validateTask,
  validateListTask,
  verifyOwnUserToken,
  validationHandler,
  createListTask
);

//update list task
router.patch(
  "",
  verifyToken,
  validateTaskOptional,
  validateListTaskOptional,
  validateTaskUserId,
  verifyOwnUserToken,
  validationHandler,
  updateListTask
);

//get list task
router.get("", verifyToken, validationHandler, getListTask);

//delete list task
router.delete("", verifyToken, validationHandler, deleteListTask);

//get list task using filter option
router.get(
  "/sharedOption",
  verifyToken,
  validationHandler,
  getListTaskWithSharedOption
);

//get list task using category name filter option
router.get(
  "/categoryOption",
  verifyToken,
  validationHandler,
  getListTaskWithCategoryName
);

export default router;
