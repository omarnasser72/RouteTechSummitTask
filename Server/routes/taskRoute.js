import Express from "express";
import { verifyToken } from "../middlewares/jwt.js";
import { sort } from "../controllers/taskConstroller.js";
import { validationHandler } from "../middlewares/generalValidation.js";

const router = Express.Router();

router.get("", verifyToken, validationHandler, sort);

export default router;
