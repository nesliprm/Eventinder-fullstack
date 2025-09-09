import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Image,
  Text,
  Card,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddEventForm } from "../components/AddEventForm";
import { useSearch } from "./SearchContext";
import mockImage from "../assets/mockeventimage.jpg";
import { ScrollTopButton } from "../components/ScrollTopButton";
import { apiFetch } from "../lib/api";
import { LoadingScreen } from "../components/LoadingScreen";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { searchTerm } = useSearch();
  const [usersById, setUsersById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredEvents = events
    .filter((event) =>
      selectedCategory === "uncategorized"
        ? event.categoryIds.length === 0
        : selectedCategory === "showAll" || selectedCategory === ""
        ? true
        : event.categoryIds.map(String).includes(String(selectedCategory))
    )

    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        setError(null);

        const [eventResponse, categoryResponse, userResppnse] =
          await Promise.all([
            apiFetch(`/events`),
            apiFetch(`/categories`),
            apiFetch(`/users`),
          ]);

        const [events, categories, users] = await Promise.all([
          eventResponse.json(),
          categoryResponse.json(),
          userResppnse.json(),
        ]);

        setEvents(
          events.map((event) => ({
            ...event,
            categoryIds: (event.categoryIds || []).map(String),
          }))
        );

        setCategories(categories);

        setUsersById(
          users.reduce((acc, user) => {
            acc[String(user.id)] = user;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error(error);
        setError("Couldn’t load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  return (
    <Box maxW="container.lg" mx="auto" p={4}>
      <Heading
        my="10"
        textAlign={{ base: "center", md: "left" }}
        fontSize={{ base: "4xl", md: "5xl" }}
      >
        Upcoming Events
      </Heading>
      <HStack>
        {" "}
        <Box width={{ base: "100%", md: "30%" }}>
          <Select
            placeholder="filter by category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="showAll">show all</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <option value="uncategorized">uncategorized</option>
          </Select>
        </Box>
        <Text as="b">OR</Text>
        <Button onClick={onOpen} w={{ base: "100%", md: "auto" }}>
          Add a new event
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new event:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEventForm
              onSubmit={(newEvent) => {
                setEvents((prev) => [...prev, newEvent]);
                setSelectedCategory("");
              }}
              onClose={onClose}
              categories={categories}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <Text color="red.500" mt={8}>
          {error}
        </Text>
      ) : (
        <Box my={10} display="grid" gap={6}>
          {filteredEvents.length === 0 ? (
            <Text>No events found.</Text>
          ) : (
            filteredEvents.map((event) => {
              const start = new Date(event.startTime).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              });
              const end = new Date(event.endTime).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              });

              const categoryNames = event.categoryIds.map((id) => {
                const match = categories.find((category) => category.id === id);
                return match ? match.name : "Uncategorized";
              });

              return (
                <Link key={event.id} to={`/event/${event.id}`}>
                  {" "}
                  <Card
                    key={event.id}
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    borderRadius="20"
                    _hover={{
                      boxShadow: "md",
                      transform: "translate(-1px)",
                      transition: "all 0.1s ease-in-out",
                    }}
                  >
                    <Stack
                      display="flex"
                      direction="column"
                      p={6}
                      flex="1"
                      justify="space-between"
                    >
                      <Box>
                        <Heading as="b" fontSize="3xl">
                          {event.title}
                        </Heading>

                        <HStack mt="3" spacing={2} align="center">
                          {(() => {
                            const key = String(event.createdBy);
                            const isIdLike = /^\d+$/.test(key);
                            const creator = isIdLike
                              ? usersById[key]
                              : typeof event.createdBy === "string"
                              ? { name: event.createdBy }
                              : null;
                            return (
                              <>
                                <Text fontSize="sm" color="gray.600">
                                  Created by{" "}
                                  <Text as="span" fontWeight="semibold">
                                    {creator?.name || "Unknown"}
                                  </Text>
                                </Text>
                                {creator?.image && (
                                  <Image
                                    src={creator.image}
                                    alt={creator.name}
                                    boxSize="28px"
                                    objectFit="cover"
                                    borderRadius="full"
                                  />
                                )}
                              </>
                            );
                          })()}
                        </HStack>

                        <Text py="5" fontSize="sm">
                          {event.description}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm">Starts: {start}</Text>
                        <Text fontSize="sm">Ends: {end}</Text>
                        <Text fontSize="sm">
                          Categories: {categoryNames.join(", ")}
                        </Text>
                      </Box>
                    </Stack>

                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.description}
                        w={{ base: "100%", sm: "xs" }}
                        maxH={{ base: "200px", sm: "100%" }}
                        boxSize={{ sm: "xs" }}
                        objectFit="cover"
                        alignSelf="stretch"
                      />
                    ) : (
                      <Image
                        src={mockImage}
                        alt={event.description}
                        w={{ base: "100%", sm: "xs" }}
                        maxH={{ base: "200px", sm: "100%" }}
                        boxSize={{ sm: "xs" }}
                        objectFit="cover"
                        alignSelf="stretch"
                      />
                    )}
                  </Card>
                </Link>
              );
            })
          )}
        </Box>
      )}

      <Box>{filteredEvents.length === 0 ? "" : <ScrollTopButton />}</Box>
    </Box>
  );
};
