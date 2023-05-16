export const registerClientDTO = (user, client) => ({
  userId: user.id,
  clientId: client.id,
  roleId: user.roleId,
  email: user.email,
  firstName: client.firstName,
  lastName: client.lastName,
  phoneNumber: user.phoneNumber,
});

export const registerClinicDTO = (user, clinic) => ({
  userId: user.id,
  clinicId: clinic.id,
  roleId: user.roleId,
  email: user.email,
  address: clinic.address,
  name: clinic.name,
  phoneNumber: user.phoneNumber,
});

export const updateClinicDTO = (user, clinic) => ({
  userId: user.id,
  address: clinic.address,
  name: clinic.name,
  phoneNumber: user.phoneNumber,
});

export const updateClientDTO = (user, client) => ({
  userId: user.id,
  firstName: client.firstName,
  lastName: client.lastName,
  phoneNumber: user.phoneNumber,
});
