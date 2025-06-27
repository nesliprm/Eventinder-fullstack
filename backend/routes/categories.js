import express from "express";
import { createCategory } from "../services/categories/createCategory.js";
import { deleteCategory } from "../services/categories/deleteCategory.js";
import { getCategoryById } from "../services/categories/getCategoryById.js";
import { getCategories } from "../services/categories/getCategories.js";
import { updateCategory } from "../services/categories/updateCategory.js";

const router = express.Router();

router.get("/", (req, res) => {
  const categories = getCategories();
  res.json(categories);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const newCategory = createCategory(name);
  res.status(201).json(newCategory);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const category = getCategoryById(id);
  res.json(category);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = updateCategory(id, name);
  res.json(updatedCategory);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedCategory = deleteCategory(id);
  res
    .status(200)
    .json({ message: `Category with id ${deletedCategory.id} was deleted.` });
});

export default router;
