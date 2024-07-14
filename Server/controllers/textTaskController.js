import TextTask from "../models/TextTask.js";
import { createError } from "../utils/error.js";
import { validateCategoryId } from "../middlewares/categoryValidation.js";
import { validateTaskId } from "../middlewares/taskValidation.js";
import { validateUserId } from "../middlewares/userValidation.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const createTextTask = async (req, res, next) => {
  try {
    const { title, categoryId, userId } = req.body;

    let task = await TextTask.findOne({ title, categoryId });
    if (task) return next(createError(400, "task title already exists."));

    const userOwnsThisCategory = await Category.findOne({
      _id: categoryId,
      userId,
    });
    if (!userOwnsThisCategory)
      return next(createError(401, "This category doesn't belong to you."));

    task = new TextTask({
      ...req.body,
      type: "textTask",
    });
    await TextTask.findById(categoryId);

    const savedTask = await task.save();
    if (!savedTask) return next(500, "Couldn't save task.");

    task = savedTask.toObject();
    delete task.__v;
    delete task.__t;

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    validateCategoryId(error, req, res, next);
    validateUserId(error, req, res, next);
    next(error);
  }
};

export const updateTextTask = async (req, res, next) => {
  try {
    const { categoryId } = req.body;
    const { id } = req.query;

    if (categoryId) await Category.findById(categoryId);

    let task = await TextTask.findById(id);
    if (!task) return next(createError(404, "Task id doesn't exist."));

    const updatedTask = await TextTask.findByIdAndUpdate(
      id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    if (!updatedTask) return next(createError(500, "Couldn't update Task."));

    task = updatedTask?.toObject();
    delete task.__v;
    delete task.__t;

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    validateTaskId(error, req, res, next);
    validateCategoryId(error, req, res, next);
    next(error);
  }
};

export const getTextTask = async (req, res, next) => {
  try {
    const { id } = req.query;
    const userId = jwt.verify(req.cookies["token"], process.env.JWT)?._id;
    if (id) {
      const task = await TextTask.findOne({ _id: id, userId });
      if (!task)
        return next(createError(403, "This task is private or doesn't exist."));
      task.toObject();
      delete task.__v;
      delete task.__t;

      res.status(200).json({
        success: true,
        task,
      });
    } else {
      const tasksArray = await TextTask.find({
        $or: [{ shared: true }, { userId }],
      });

      const tasks = tasksArray.map((task) => {
        const taskObj = task.toObject();
        delete taskObj.__v;
        delete taskObj.__t;
        return taskObj;
      });
      res.status(200).json({ success: true, tasks });
    }
  } catch (error) {
    validateTaskId(error, req, res, next);
    next(error);
  }
};

export const deleteTextTask = async (req, res, next) => {
  try {
    const { id } = req.query;
    const userId = jwt.verify(req.cookies["token"], process.env.JWT)?._id;

    const task = await TextTask.findById(id);
    if (!task) return next(createError(404, "task not found"));
    const taskUserId = task.toObject().userId.toString();

    if (userId !== taskUserId)
      return next(createError(403, "This isn't your task."));
    const isDeleted = await TextTask.findByIdAndDelete(id);
    console.log(isDeleted);
    if (!isDeleted) return next(createError(400, "Couldn't delete task."));
    res.status(200).json({
      success: true,
      message: `Task ${isDeleted.title} has been deleted successfully.`,
    });
  } catch (error) {
    validateTaskId(error, req, res, next);
    next(error);
  }
};

export const getTextTaskWithSharedOption = async (req, res, next) => {
  try {
    const { shared } = req.body;
    const userId = jwt.verify(req.cookies["token"], process.env.JWT)?._id;
    if (!userId)
      return next(createError(400, "Couldn't find tasks with your id."));

    let tasksArray;
    shared === true
      ? (tasksArray = await TextTask.find({ shared }))
      : (tasksArray = await TextTask.find({ $and: [{ shared }, { userId }] }));

    const tasks = tasksArray.map((task) => {
      const taskObj = task.toObject();
      delete taskObj.__v;
      delete taskObj.__t;
      return taskObj;
    });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

export const getTextTaskWithCategoryName = async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    const userId = jwt.verify(req.cookies["token"], process.env.JWT)?._id;
    if (!userId)
      return next(createError(400, "Couldn't find tasks with your id."));

    const categoryId = (await Category.findOne({ name: categoryName, userId }))
      ?._id;

    console.log("categoryId: ", categoryId);
    if (!categoryId)
      return next(
        createError(400, "Couldn't find category name that has your id.")
      );

    const tasksArray = await TextTask.find({ categoryId });

    const tasks = tasksArray.map((task) => {
      const taskObj = task.toObject();
      delete taskObj.__v;
      delete taskObj.__t;
      return taskObj;
    });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    validateUserId(error, req, res, next);
    next(error);
  }
};
