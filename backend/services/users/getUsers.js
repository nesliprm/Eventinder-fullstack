import userData from "../../data/users.json" assert { type: "json" };

export const getUsers = () => {
  let users = userData.users;
  return users;
};
