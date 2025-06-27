import userData from "../../data/users.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

export const createUser = (username, password, name) => {
  const newUser = {
    id: uuid(),
    username,
    password,
    name,
  };
  userData.users.push(newUser);
  return newUser;
};
