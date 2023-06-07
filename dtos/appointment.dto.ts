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

export const getAppointmentsDTO = (appointmentsInfo) => {
  return appointmentsInfo.map((info) => {
    return {
      id: info.dataValues.id,
      clientId: info.dataValues.clientId,
      date: info.dataValues.date,
      slot: info.dataValues.slot,
      description: info.dataValues.description,
      status: info.dataValues.status,
      animalAge: info.dataValues.animalAge,
      animal: {
        id: info.dataValues.animal.id,
        name: info.dataValues.animal.name,
      },
      medic: {
        id: info.medicId,
        firstName: info.firstName,
        lastName: info.lastName,
        specializationId: info.specializationId,
        estimatedPrice: info.estimatedPrice,
      },
      clinic: {
        id: info.clinicId,
        name: info.name,
        address: info.address,
        phoneNumber: info.phoneNumber,
      },
    };
  });
};

export const getAppointmentsByMedicIdDTO = (
  todayAppointments,
  appointmentsFromYesterday,
  prevAppointments
) => {
  return {
    todayAppointments: todayAppointments.map((ap) => {
      return {
        ...ap,
        animal: { id: ap.animal.id, name: ap.animal.name },
      };
    }),
    yesterdayAppointments: appointmentsFromYesterday.map((ap) => {
      return {
        ...ap,
        animal: { id: ap.animal.id, name: ap.animal.name },
      };
    }),
    previousAppointments: prevAppointments.map((prev) => {
      return {
        ...prev,
        animal: { id: prev.animal.id, name: prev.animal.name },
      };
    }),
  };
};
