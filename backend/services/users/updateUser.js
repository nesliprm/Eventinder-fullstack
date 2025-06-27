import userData from "../../data/users.json" assert { type: "json" };

export const updateUser = (id, username, password, name) => {
  const user = userData.users.find((user) => user.id === id);
  if (!user) {
    throw new Error(`User with id ${id} is not found.`);
  }

  user.username = username ?? user.username;
  user.password = password ?? user.password;
  user.name = name ?? user.name;

  return user;
};
