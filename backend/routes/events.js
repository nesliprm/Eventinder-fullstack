import express from "express";
import { createEvent } from "../services/events/createEvent.js";
import { deleteEvent } from "../services/events/deleteEvent.js";
import { getEventById } from "../services/events/getEventById.js";
import { getEvents } from "../services/events/getEvents.js";
import { updateEvent } from "../services/events/updateEvent.js";

const router = express.Router();

router.get("/", (req, res) => {
  const events = getEvents();
  res.json(events);
});

router.post("/", (req, res) => {
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
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const event = getEventById(id);
  res.json(event);
});

router.put("/:id", (req, res) => {
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
  console.log("Updating event:", id, req.body);
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
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedEvent = deleteEvent(id);
  res
    .status(200)
    .json({ message: `Event with id ${deletedEvent.id} was deleted.` });
});

export default router;
