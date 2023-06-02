export interface createMedicInterface {
  firstName: string;
  lastName: string;
  estimatedPrice: number;
  specializationId: string;
  animalIds: number[];
}

export interface updateMedicInterface {
  firstName: string;
  lastName: string;
  estimatedPrice: number;
  animalIds: number[];
}

export interface getMedicsBodyInterface {
  clinicId: string;
  specializationId: string;
  animalId: string;
}

export interface GetRecommendedMedicsBodyInterface
  extends getMedicsBodyInterface {
  date: string;
}
