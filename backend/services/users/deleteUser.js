import userData from "../../data/users.json" assert { type: "json" };

export const deleteUser = (id) => {
  const index = userData.users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error(`User with id ${id} is not found.`);
  }

  const deletedUser = userData.users.splice(index, 1)[0];
  return deletedUser;
};
