import Animal from "../models/Animal";
import { getAnimalsDTO } from "../dtos/animal.dto";

module.exports.getAnimals = async () => {
  const animals = await Animal.findAll();
  return getAnimalsDTO(animals);
};
