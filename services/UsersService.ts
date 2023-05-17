import {
  checkPasswordMatch,
  isValidEmail,
  isValidPassword,
} from "../utils/functions";
import {
  LogInInterface,
  RegisterClientInterface,
  RegisterClinicInterface,
  UpdateClientInterface,
  UpdateClinicInterface,
} from "./UsersService.type";
const crypto = require("crypto");
const uuid = require("uuid");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
import User from "../models/User";
import Client from "../models/Client";
import Clinic from "../models/Clinic";
import {
  clientDTO,
  clinicDTO,
  getClientDetailsDTO,
  getClinicDetailsDTO,
} from "../dtos/user.dto";

const sendActivationEmail = async (email: string, activationToken: string) => {
  try {
    dotenv.config({
      path: "../.env",
    });
    const clientEmail = email;
    const frontendUrl = process.env.FRONTEND_URL;
    const activationLink =
      frontendUrl +
      `/activate-account?email=${clientEmail}&token=${activationToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"HappyPaws!" <${process.env.APP_EMAIL}>`,
      to: clientEmail,
      subject: "Activate your HappyPaws account!",
      text: `Hello there! Welcome to HappyPaws! Click on the link below in order to activate your account. ${activationLink}`,
      html: `<h1>Hello there!</h1> <h4>Welcome to HappyPaws! Click on the link below in order to activate your account.</h4> <h4> <a href="${activationLink}">${activationLink}</a></h4>`,
    });
  } catch (err) {
    console.error("Error while sending the validation mail! ", err);
  }
};

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

  const activationToken = uuid.v4().replace(/-/g, "");

  const user = await User.create({
    roleId: 0,
    email: body.email,
    password: password,
    phoneNumber: body.phoneNumber,
    emailActivated: false,
    activationToken: activationToken,
  });

  const client = await Client.create({
    userId: user.dataValues.id,
    firstName: body.firstName,
    lastName: body.lastName,
  });
  await sendActivationEmail(user.email, user.activationToken);
  return clientDTO(user, client);
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
        "Please make sure the password has at least 8 characters, at least an uppercase letter, at least a lowercase letter, a number and a special character!",
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

  const activationToken = uuid.v4().replace(/-/g, "");

  const user = await User.create({
    roleId: 1,
    email: body.email,
    password: password,
    phoneNumber: body.phoneNumber,
    emailActivated: false,
    activationToken: activationToken,
  });

  const clinic = await Clinic.create({
    userId: user.dataValues.id,
    address: body.address,
    name: body.name,
  });
  await sendActivationEmail(user.email, user.activationToken);
  return clinicDTO(user, clinic);
};

module.exports.activateEmail = async (email: string, token: string) => {
  const existingUserEmail = await User.findOne({
    where: { email: email },
  });
  if (!existingUserEmail) {
    console.log("This email doesn't exist!");
    throw "ERROR";
  }

  const existingActivationToken = User.findOne({
    where: { activationToken: token },
  });
  if (!existingActivationToken) {
    console.log("This token is not found!");
    throw "ERROR";
  }

  await User.update({ emailActivated: true }, { where: { email: email } });

  if (existingUserEmail.roleId === 0) {
    const client = await Client.findOne({
      where: { userId: existingUserEmail.id },
    });

    return {
      token: jwt.sign(
        clientDTO(existingUserEmail, client),
        process.env.JWT_SECRET
      ),
    };
  } else {
    const clinic = await Clinic.findOne({
      where: { userId: existingUserEmail.id },
    });

    return {
      token: jwt.sign(
        clinicDTO(existingUserEmail, clinic),
        process.env.JWT_SECRET
      ),
    };
  }
};

module.exports.logIn = async (user: LogInInterface) => {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(user.password)
    .digest("hex");

  const logingInUser = await User.findOne({
    where: {
      email: user.email,
      password: hashedPassword,
      emailActivated: true,
    },
  });
  if (!logingInUser) {
    throw {
      code: 400,
      error: "Invalid user!",
      message: "Email or password is invalid!",
    };
  }
  if (logingInUser.roleId === 0) {
    const client = await Client.findOne({
      where: { userId: logingInUser.id },
    });

    return {
      token: jwt.sign(clientDTO(logingInUser, client), process.env.JWT_SECRET),
    };
  } else {
    const clinic = await Clinic.findOne({
      where: { userId: logingInUser.id },
    });

    return {
      token: jwt.sign(clinicDTO(logingInUser, clinic), process.env.JWT_SECRET),
    };
  }
};

module.exports.editClinic = async (
  userId: string,
  clinicId: string,
  body: UpdateClinicInterface
) => {
  const clinicToUpdate = await Clinic.findOne({
    where: {
      id: clinicId,
      userId: userId,
    },
  });
  const userToUpdate = await User.findOne({ where: { id: userId } });

  if (!clinicToUpdate || !userToUpdate) {
    throw {
      code: 400,
      error: "Invalid clinic!",
      message: "Clinic or user not found!",
    };
  }

  const updatedClinic = await clinicToUpdate.update({
    ...clinicToUpdate,
    address: body.address,
    name: body.name,
  });
  const updatedUser = await userToUpdate.update({
    ...userToUpdate,
    phoneNumber: body.phoneNumber,
  });

  return clinicDTO(updatedUser, updatedClinic);
};

module.exports.editClient = async (
  userId: string,
  clientId: string,
  body: UpdateClientInterface
) => {
  const clientToUpdate = await Client.findOne({
    where: {
      id: clientId,
      userId: userId,
    },
  });
  const userToUpdate = await User.findOne({ where: { id: userId } });

  if (!clientToUpdate || !userToUpdate) {
    throw {
      code: 400,
      error: "Invalid clinic!",
      message: "Client or user not found!",
    };
  }

  const updatedClient = await clientToUpdate.update({
    ...clientToUpdate,
    firstName: body.firstName,
    lastName: body.lastName,
  });
  const updatedUser = await userToUpdate.update({
    ...userToUpdate,
    phoneNumber: body.phoneNumber,
  });

  return clientDTO(updatedUser, updatedClient);
};

module.exports.getClientDetails = async (userId: string) => {
  const client = await Client.findOne({
    where: { userId: userId },
    include: { model: User },
  });
  if (!client) {
    throw {
      code: 400,
      error: "Invalid clinic!",
      message: "Client not found!",
    };
  }

  return getClientDetailsDTO(client);
};

module.exports.getClinicDetails = async (userId: string) => {
  const clinic = await Clinic.findOne({
    where: { userId: userId },
    include: { model: User },
  });
  if (!clinic) {
    throw {
      code: 400,
      error: "Invalid clinic!",
      message: "Clinic not found!",
    };
  }

  return getClinicDetailsDTO(clinic);
};
