export const createAppointmentDTO = (appointment, animal, medic) => ({
  id: appointment.id,
  clientId: appointment.clientId,
  date: appointment.date,
  slot: appointment.slot,
  description: appointment.description,
  status: appointment.status,
  animalAge: appointment.animalAge,
  animal: { id: animal.id, name: animal.name },
  medic: {
    id: medic.id,
    clinicId: medic.clinicId,
    specializationId: medic.specializationId,
    firstName: medic.firstName,
    lastName: medic.lastName,
    estimatedPrice: medic.estimatedPrice,
  },
});
