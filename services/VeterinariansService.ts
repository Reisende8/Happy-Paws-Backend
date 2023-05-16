import Clinic from "../models/Clinic";
import Veterinarian from "../models/Veterinarian";
const { Op } = require("sequelize");
import {
  createMedicInterface,
  getMedicsBodyInterface,
  updateMedicInterface,
} from "./VeterinariansService.type";
import { medicDTO, getMedicsDTO } from "../dtos/veterinarian.dto";
import WorksWith from "../models/WorksWith";
import { isWrongAnimalId } from "../utils/functions";
import Animal from "../models/Animal";

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
  if (
    body.animalIds.length > 2 ||
    body.animalIds[0] === body.animalIds[1] ||
    isWrongAnimalId(body.animalIds)
  ) {
    throw {
      status: 400,
      error: `Error!`,
      message: `Invalid animalIds!`,
    };
  }

  const createdMedic = await Veterinarian.create({
    clinicId: clinicToCreateMedic.id,
    firstName: body.firstName,
    lastName: body.lastName,
    specializationId: body.specializationId,
    estimatedPrice: body.estimatedPrice,
  });

  WorksWith.bulkCreate(
    body.animalIds.map((id) => ({
      animalId: id,
      veterinarianId: createdMedic.id,
    }))
  );

  const animals = await Animal.findAll({
    where: { id: { [Op.in]: body.animalIds as number[] } },
  });

  return medicDTO(
    clinicToCreateMedic.id,
    createdMedic,
    animals.map((a) => a.dataValues)
  );
};

module.exports.editMedic = async (
  userId: string,
  medicId: string,
  body: updateMedicInterface
) => {
  const clinicToUpdateMedic = await Clinic.findOne({
    where: {
      userId: userId,
    },
  });
  if (!clinicToUpdateMedic) {
    throw {
      status: 400,
      error: `Error!`,
      message: `Invalid clinic to edit a medic to!`,
    };
  }
  const medicToUpdate = await Veterinarian.findOne({
    where: {
      id: medicId,
      clinicId: clinicToUpdateMedic.id,
    },
  });

  if (!medicToUpdate) {
    throw {
      status: 400,
      error: `Error!`,
      message: `Invalid medic to edit to!`,
    };
  }

  const updatedMedic = await medicToUpdate.update({
    ...medicToUpdate,
    firstName: body.firstName,
    lastName: body.lastName,
    estimatedPrice: body.estimatedPrice,
  });

  await WorksWith.destroy({ where: { veterinarianId: medicId } });

  WorksWith.bulkCreate(
    body.animalIds.map((id) => ({
      animalId: id,
      veterinarianId: medicId,
    }))
  );

  const animals = await Animal.findAll({
    where: { id: { [Op.in]: body.animalIds as number[] } },
  });

  return medicDTO(
    clinicToUpdateMedic.id,
    updatedMedic,
    animals.map((a) => a.dataValues)
  );
};

module.exports.deleteMedic = async (userId: string, medicId: string) => {
  const clinicOfMedic = await Clinic.findOne({
    where: {
      userId: userId,
    },
  });
  if (!clinicOfMedic) {
    throw {
      status: 400,
      error: `Error!`,
      message: `Invalid clinic to delete a medic to!`,
    };
  }
  const medicToDelete = await Veterinarian.findOne({
    where: {
      id: medicId,
      clinicId: clinicOfMedic.id,
    },
  });

  if (!medicToDelete) {
    throw {
      status: 400,
      error: `Error!`,
      message: `The medic you want to delete does not exist!`,
    };
  }
  await medicToDelete.destroy();
  return { succes: true };
};

module.exports.getMedics = async (body?: getMedicsBodyInterface) => {
  const getMedics = await Veterinarian.findAll({
    where: {
      [Op.and]: [
        body.clinicId ? { clinicId: body.clinicId } : undefined,
        body.specializationId
          ? { specializationId: body.specializationId }
          : undefined,
      ],
    },
    include: [
      {
        model: Animal,
      },
    ],
  });

  const filteredByAnimals = body.animalId
    ? getMedics.filter((m) =>
        m.dataValues.animals
          .map((a) => a.dataValues.id)
          .includes(body.animalId.toString())
      )
    : getMedics;

  return getMedicsDTO(filteredByAnimals);
};
