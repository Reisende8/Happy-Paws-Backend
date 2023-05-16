import Clinic from "../models/Clinic";
import Veterinarian from "../models/Veterinarian";
import { createMedicInterface } from "./VeterinariansService.type";

module.exports.createMedic = async (
  userId: string,
  body: createMedicInterface
) => {
  const clinicToCreateMedic = await Clinic.findOne({
    where: {
      userId: userId,
    },
  });

  if (!clinicToCreateMedic) {
    throw {
      status: 400,
      error: `Error!`,
      message: `Invalid clinic to add a medic to!`,
    };
  }

  const clinicId = clinicToCreateMedic.id;

  const createdMedic = await Veterinarian.create({
    clinicId: clinicId,
    firstName: body.firstName,
    lastName: body.lastName,
    specializationId: body.specializationId,
    estimatedPrice: body.estimatedPrice,
  });

  return createdMedic;
};
