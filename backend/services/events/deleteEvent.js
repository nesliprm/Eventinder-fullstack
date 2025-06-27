import eventData from "../../data/events.json" assert { type: "json" };

export const deleteEvent = (id) => {
  const index = eventData.events.findIndex((event) => event.id === id);
  if (index === -1) {
    throw new Error(`Event with id ${id} is not found.`);
  }

  const deletedEvent = eventData.events.splice(index, 1)[0];
  return deletedEvent;
};
