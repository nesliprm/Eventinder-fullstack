import express from "express";
import { createUser } from "../services/users/createUser.js";
import { deleteUser } from "../services/users/deleteUser.js";
import { getUserById } from "../services/users/getUserById.js";
import { getUsers } from "../services/users/getUsers.js";
import { updateUser } from "../services/users/updateUser.js";

const router = express.Router();

router.get("/", (req, res) => {
  const users = getUsers();
  res.json(users);
});

router.post("/", (req, res) => {
  const { username, password, name } = req.body;
  const newUser = createUser(username, password, name);
  res.status(201).json(newUser);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);
  res.json(user);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { username, password, name } = req.body;
  const updatedUser = updateUser(id, username, password, name);
  res.json(updatedUser);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedUser = deleteUser(id);
  res
    .status(200)
    .json({ message: `User with id ${deletedUser.id} was deleted.` });
});

export default router;
