import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { apiFetch } from "../lib/api";

export const AddEventForm = ({ event, onClose, categories, onSubmit }) => {
  const toast = useToast();
  const [title, setTitle] = useState(event?.title || "");
  const [createdBy, setCreatedBy] = useState(event?.createdBy || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const [endTime, setEndTime] = useState(event?.endTime || "");
  const [categoryIds, setCategoryIds] = useState(event?.categoryIds || []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      createdBy,
      description,
      startTime,
      endTime,
      categoryIds,
    };

    const url = event ? `/events/${event.id}` : "/events";
    const method = event ? "PUT" : "POST";
    try {
      const response = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resultEvent = await response.json();
      onSubmit(resultEvent);
      toast({
        title: event ? "Event updated" : "Event created",
        status: "success",
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Save failed",
        description: String(error),
        status: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <FormLabel mt={3}>Creator</FormLabel>
        <Input
          type="text"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />

        <FormLabel mt={3}>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <FormLabel mt={3}>Starts</FormLabel>
        <Input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <FormLabel mt={3}>Ends</FormLabel>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <FormLabel mt={3}>Category</FormLabel>
        <Select
          placeholder="Select a category"
          required
          value={categoryIds[0] ?? ""}
          onChange={(e) =>
            setCategoryIds(
              e.target.value === "" ? [] : [Number(e.target.value)]
            )
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Button type="submit" my={5}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
};
