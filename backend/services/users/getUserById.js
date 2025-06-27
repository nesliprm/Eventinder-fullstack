import userData from "../../data/users.json" assert { type: "json" };

export const getUserById = (id) => {
  const user = userData.users.find((user) => user.id === id);
  if (!user) {
    throw new Error(`User with id ${id} is not found.`);
  }
  return user;
};
