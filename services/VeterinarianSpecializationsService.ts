import VeterinarianSpecialization from "../models/VeterinarianSpecialization";
import { getVetSpeclDTO } from "../dtos/veterinarianSpecialization.dto";

module.exports.getVeterinarianSpecializations = async () => {
  const veterinarianSpecializations =
    await VeterinarianSpecialization.findAll();
  return getVetSpeclDTO(veterinarianSpecializations);
};
