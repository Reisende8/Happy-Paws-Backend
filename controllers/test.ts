import sequelize from "../models/index";
import User from "../models/User";
export const testSequelize = async () => {
  const allUsers = await User.findAll();
  console.log("All users are\n", allUsers);
  return allUsers;
};

export const createUser = async () => {
  await User.create({
    firstName: "Angry",
    lastName: "Bunciu",
    email: "ANGRY!",
  });
};
