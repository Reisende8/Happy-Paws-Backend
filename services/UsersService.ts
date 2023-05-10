import {
  checkPasswordMatch,
  isValidEmail,
  isValidPassword,
} from "../utils/functions";
import {
  RegisterClientInterface,
  RegisterClinicInterface,
} from "./UsersService.type";
const crypto = require("crypto");
import User from "../models/User";
import Client from "../models/Client";
import Clinic from "../models/Clinic";
import { registerClientDTO, registerClinicDTO } from "../dtos/user.dto";

module.exports.registerClient = async (body: RegisterClientInterface) => {
  if (!isValidEmail(body.email)) {
    throw {
      status: 400,
      error: "Error! Email is invalid!",
      message: "Please make sure you inserted a valid email!",
    };
  }

  if (!isValidPassword(body.password)) {
    throw {
      status: 400,
      error: "Error! Password is invalid!",
      message:
        "Please make sure the password has at least 8 characters,at least an uppercase letter,at least a lowercase letter, a number and a special character!",
    };
  }

  const duplicateEmail = await User.findOne({
    where: {
      email: body.email,
    },
  });

  if (duplicateEmail) {
    throw {
      status: 400,
      error: `Error! The email is already taken!`,
      message: `The email you have inserted is already taken. Please try another one!`,
    };
  }

  if (checkPasswordMatch(body.password, body.repeatPassword)) {
    throw {
      status: 400,
      error: `Error! The password and repeat password are different!`,
      message: `The password and repeat password do not match!`,
    };
  }

  const password = crypto
    .createHash("sha256")
    .update(body.password)
    .digest("hex");

  const user = await User.create({
    roleId: 0,
    email: body.email,
    password: password,
    phoneNumber: body.phoneNumber,
  });

  const client = await Client.create({
    userId: user.dataValues.id,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  return registerClientDTO(user, client);
};

module.exports.registerClinic = async (body: RegisterClinicInterface) => {
  if (!isValidEmail(body.email)) {
    throw {
      status: 400,
      error: "Error! Email is invalid!",
      message: "Please make sure you inserted a valid email!",
    };
  }

  if (!isValidPassword(body.password)) {
    throw {
      status: 400,
      error: "Error! Password is invalid!",
      message:
        "Please make sure the password has at least 8 characters,at least an uppercase letter,at least a lowercase letter, a number and a special character!",
    };
  }

  const duplicateEmail = await User.findOne({
    where: {
      email: body.email,
    },
  });

  if (duplicateEmail) {
    throw {
      status: 400,
      error: `Error! The email is already taken!`,
      message: `The email you have inserted is already taken. Please try another one!`,
    };
  }

  if (checkPasswordMatch(body.password, body.repeatPassword)) {
    throw {
      status: 400,
      error: `Error! The password and repeat password are different!`,
      message: `The password and repeat password do not match!`,
    };
  }

  const password = crypto
    .createHash("sha256")
    .update(body.password)
    .digest("hex");

  const user = await User.create({
    roleId: 1,
    email: body.email,
    password: password,
    phoneNumber: body.phoneNumber,
  });

  const clinic = await Clinic.create({
    userId: user.dataValues.id,
    address: body.address,
    name: body.name,
  });

  return registerClinicDTO(user, clinic);
};
