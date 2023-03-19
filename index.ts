import { Sequelize } from "sequelize-typescript";
import sequelize from "./models/index";
const express = require("express");
const dotenv = require("dotenv");
import User from "./models/User";
import Role from "./models/Role";
import { createUser, testSequelize } from "./controllers/test";
const app = express();
dotenv.config();
const port = process.env.PORT; // default port to listen

sequelize.addModels([User, Role]);
sequelize.sync();

// define a route handler for the default home page
app.get("/", async (req, res) => {
  await createUser();
  const users = await testSequelize();
  res.status(200).json(users);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
