import express from "express";
import { createEvent } from "../services/events/createEvent.js";
import { deleteEvent } from "../services/events/deleteEvent.js";
import { getEventById } from "../services/events/getEventById.js";
import { getEvents } from "../services/events/getEvents.js";
import { updateEvent } from "../services/events/updateEvent.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { title } = req.query;
    const events = getEvents(title);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", authMiddleware, (req, res) => {
  try {
    const {
      createdBy,
      title,
      description,
      categoryIds,
      location,
      startTime,
      endTime,
    } = req.body;
    const newEvent = createEvent(
      createdBy,
      title,
      description,
      categoryIds,
      location,
      startTime,
      endTime
    );
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const event = getEventById(id);
    res.json(event);
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: `Event with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const {
      createdBy,
      title,
      description,
      categoryIds,
      location,
      startTime,
      endTime,
    } = req.body;

    const updatedEvent = updateEvent(
      id,
      createdBy,
      title,
      description,
      categoryIds,
      location,
      startTime,
      endTime
    );
    res.json(updatedEvent);
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: `Event with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = deleteEvent(id);
    res
      .status(200)
      .json({ message: `Event with id ${deletedEvent.id} was deleted.` });
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: `Event with ID ${id} not found` });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
