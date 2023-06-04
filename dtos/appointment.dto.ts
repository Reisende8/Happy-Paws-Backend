export const createAppointmentDTO = (
  appointment,
  animal,
  medic,
  clinic,
  user
) => ({
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
    specializationId: medic.specializationId,
    firstName: medic.firstName,
    lastName: medic.lastName,
    estimatedPrice: medic.estimatedPrice,
  },
  clinic: {
    id: clinic.id,
    name: clinic.name,
    address: clinic.address,
    phoneNumber: user.phoneNumber,
  },
});
