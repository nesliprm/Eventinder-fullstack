import eventData from "../../data/events.json" assert { type: "json" };

export const getEvents = () => {
  let events = eventData.events;
  return events;
};
