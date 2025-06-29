import express from "express";
import { createCategory } from "../services/categories/createCategory.js";
import { deleteCategory } from "../services/categories/deleteCategory.js";
import { getCategoryById } from "../services/categories/getCategoryById.js";
import { getCategories } from "../services/categories/getCategories.js";
import { updateCategory } from "../services/categories/updateCategory.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const categories = getCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", authMiddleware, (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = createCategory(name);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const category = getCategoryById(id);
    res.json(category);
  } catch (err) {
    if (err.message.includes("not found")) {
      return res
        .status(404)
        .json({ message: `Category with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = updateCategory(id, name);
    res.json(updatedCategory);
  } catch (err) {
    if (err.message.includes("not found")) {
      return res
        .status(404)
        .json({ message: `Category with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = deleteCategory(id);
    res
      .status(200)
      .json({ message: `Category with id ${deletedCategory.id} was deleted.` });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res
        .status(404)
        .json({ message: `Category with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
