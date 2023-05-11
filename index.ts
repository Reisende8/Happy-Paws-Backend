//import { Sequelize } from "sequelize-typescript";
import sequelize from "./models/index";
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const UserController = require("./controllers/UserController");
const AnimalController = require("./controllers/AnimalController");
const VeterinarianSpecializationController = require("./controllers/VeterinarianSpecializationController");
import User from "./models/User";
import Role from "./models/Role";
import Appointment from "./models/Appointment";
import Animal from "./models/Animal";
import Client from "./models/Client";
import Clinic from "./models/Clinic";
import Veterinarian from "./models/Veterinarian";
import VeterinarianSpecialization from "./models/VeterinarianSpecialization";
import WorksWith from "./models/WorksWith";

const app = express();
dotenv.config();
const port = process.env.PORT; // default port to listen

sequelize.addModels([
  User,
  Role,
  Animal,
  Appointment,
  Client,
  Clinic,
  Veterinarian,
  VeterinarianSpecialization,
  WorksWith,
]);
//sequelize.sync({ force: true });
sequelize.sync();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", UserController);
app.use("/api/animal", AnimalController);
app.use(
  "/api/veterinarian-specialization",
  VeterinarianSpecializationController
);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
