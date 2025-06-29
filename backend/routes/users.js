import express from "express";
import { createUser } from "../services/users/createUser.js";
import { deleteUser } from "../services/users/deleteUser.js";
import { getUserById } from "../services/users/getUserById.js";
import { getUsers } from "../services/users/getUsers.js";
import { updateUser } from "../services/users/updateUser.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  try {
    const users = getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", (req, res) => {
  try {
    const { username, password, name } = req.body;
    const newUser = createUser(username, password, name);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);
    res.json(user);
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name } = req.body;
    const updatedUser = updateUser(id, username, password, name);
    res.json(updatedUser);
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = deleteUser(id);
    res
      .status(200)
      .json({ message: `User with id ${deletedUser.id} was deleted.` });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
