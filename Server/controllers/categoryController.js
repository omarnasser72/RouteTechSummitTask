import Category from "../models/Category.js";
import { createError } from "../utils/error.js";
import { validateCategoryId } from "../middlewares/categoryValidation.js";
import { validateUserId } from "../middlewares/userValidation.js";

export const createCategory = async (req, res, next) => {
  try {
    const { userId, name } = req.body;

    let category = await Category.findOne({ name });
    if (category)
      return next(createError(400, "category name already exists."));

    let user = await Category.findById(userId);
    if (user) return next(createError(400, "userId doesn't exist."));

    category = new Category({
      name,
      userId,
    });

    const savedCategory = await category.save();

    if (!savedCategory) return next(500, "Couldn't save category.");

    category = category.toObject();
    delete category.__v;

    res.status(201).json({ success: true, category });
  } catch (error) {
    validateUserId(error, req, res, next);
    validate;
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.query;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
        },
      },
      { new: true }
    );

    if (!updatedCategory)
      return next(createError(500, "Couldn't update category."));
    const category = updatedCategory.toObject();
    delete category.__v;

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    validateCategoryId(error, req, res, next);
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (id) {
      const category = await Category.findById(id);
      if (!category) return next(createError(404, "Category not found."));
      res.status(200).json({
        success: true,
        category: { id, name: category.name, userId: category.userId },
      });
    } else {
      const categoriesArray = await Category.find();

      const categories = categoriesArray.map((category) => {
        const categoryObj = category.toObject();
        delete categoryObj.__v;
        return categoryObj;
      });
      res.status(200).json({ success: true, categories });
    }
  } catch (error) {
    validateCategoryId(error, req, res, next);
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.query;
    const category = await Category.findById(id);
    if (!category) return next(createError(404, "Category id doesn't exist."));

    const isDeleted = await Category.findByIdAndDelete(id);

    if (!isDeleted) return next(createError(400, "Couldn't delete category."));

    res.status(200).json({
      success: true,
      message: `Category ${isDeleted.name} has been deleted successfully.`,
    });
  } catch (error) {
    validateCategoryId(error, req, res, next);
    next(error);
  }
};
