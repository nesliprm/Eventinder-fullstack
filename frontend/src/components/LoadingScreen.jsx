import { HStack, Spinner, Text } from "@chakra-ui/react";

export const LoadingScreen = ({ message = "Loading events…" }) => {
  return (
    <HStack mt={8} justify="center">
      <Spinner size="lg" />
      <Text>{message}</Text>
    </HStack>
  );
};
