import { createAppointmentDTO } from "../dtos/appointment.dto";
import Animal from "../models/Animal";
import Appointment from "../models/Appointment";
import Client from "../models/Client";
import Clinic from "../models/Clinic";
import User from "../models/User";
import Veterinarian from "../models/Veterinarian";
import { createAppointmentInterface } from "./AppointmentsService.type";
const { Op } = require("sequelize");

module.exports.createAppointment = async (
  userId: string,
  body: createAppointmentInterface
) => {
  const clientToCreateAppointment = await Client.findOne({
    where: {
      userId: userId,
    },
  });

  if (!clientToCreateAppointment) {
    throw {
      status: 400,
      error: `Error!`,
      message: `Invalid client to add a appointment to!`,
    };
  }

  const createdAppointment = await Appointment.create({
    animalId: body.animalId,
    clientId: clientToCreateAppointment.id,
    veterinarianId: body.veterinarianId,
    date: new Date(body.date),
    slot: body.slot,
    description: body.description,
    status: "pending",
    animalAge: body.animalAge,
  });

  const animal = await Animal.findOne({
    where: { id: body.animalId },
  });

  const medic = await Veterinarian.findOne({
    where: { id: body.veterinarianId },
  });

  const clinic = await Clinic.findOne({
    where: { id: medic.clinicId },
  });

  const user = await User.findOne({
    where: { id: userId },
  });

  return createAppointmentDTO(
    createdAppointment.dataValues,
    animal.dataValues,
    medic.dataValues,
    clinic.dataValues,
    user.dataValues
  );
};
