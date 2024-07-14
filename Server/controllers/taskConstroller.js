import Task from "../models/Task.js";
import jwt from "jsonwebtoken";

export const sort = async (req, res, next) => {
  try {
    const { order, sortKey } = req.query;
    const userId = jwt.verify(req.cookies["token"], process.env.JWT)?._id;
    if (!userId)
      return next(createError(400, "Couldn't find tasks with your id."));

    const sortOrder = order === "asc" ? 1 : -1;
    let tasks;
    if (sortKey === "categoryName") {
      tasks = await Task.aggregate([
        {
          $match: {
            $or: [{ shared: true }, { shared: false, userId }],
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $addFields: {
            categoryName: "$category.name",
          },
        },
        {
          $sort: {
            [sortKey]: sortOrder,
          },
        },
        {
          $project: {
            __v: 0,
            __t: 0,
            "category._id": 0,
            "category.__v": 0,
          },
        },
      ]);

      tasks.sort((task1, task2) => {
        const name1 = task1.categoryName.toLowerCase();
        const name2 = task2.categoryName.toLowerCase();
        if (name1 < name2) return -1;
        else if (name1 > name2) return 1;
        return 0;
      });
      tasks = tasks.map((task) => {
        delete task.category;
        return task;
      });
    } else {
      tasks = await Task.find({
        $or: [{ shared: true }, { shared: false, userId }],
      }).sort({ [sortKey]: sortOrder });
    }
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};
