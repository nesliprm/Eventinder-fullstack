import eventData from "../../data/events.json" assert { type: "json" };

export const getEventById = (id) => {
  const event = eventData.events.find((event) => event.id === id);
  if (!event) {
    throw new Error(`Event with id ${id} is not found.`);
  }
  return event;
};
