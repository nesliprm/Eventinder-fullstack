import eventData from "../../data/events.json" assert { type: "json" };

export const updateEvent = (
  id,
  createdBy,
  title,
  description,
  categoryIds,
  location,
  startTime,
  endTime
) => {
  const event = eventData.events.find((event) => event.id === id);
  if (!event) {
    throw new Error(`Event with id ${id} is not found.`);
  }

  event.createdBy = createdBy ?? event.createdBy;
  event.title = title ?? event.title;
  event.description = description ?? event.description;
  event.categoryIds = categoryIds ?? event.categoryIds;
  event.location = location ?? event.location;
  event.startTime = startTime ?? event.startTime;
  event.endTime = endTime ?? event.endTime;

  return event;
};
