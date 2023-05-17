export const clientDTO = (user, client) => ({
  userId: user.id,
  clientId: client.id,
  roleId: user.roleId,
  email: user.email,
  firstName: client.firstName,
  lastName: client.lastName,
  phoneNumber: user.phoneNumber,
});

export const clinicDTO = (user, clinic) => ({
  userId: user.id,
  clinicId: clinic.id,
  roleId: user.roleId,
  email: user.email,
  address: clinic.address,
  name: clinic.name,
  phoneNumber: user.phoneNumber,
});

export const getClientDetailsDTO = (client) => ({
  userId: client.user.id,
  clientId: client.id,
  roleId: client.user.roleId,
  email: client.user.email,
  firstName: client.firstName,
  lastName: client.lastName,
  phoneNumber: client.user.phoneNumber,
});

export const getClinicDetailsDTO = (clinic) => ({
  userId: clinic.user.id,
  clinicId: clinic.id,
  roleId: clinic.user.roleId,
  email: clinic.user.email,
  address: clinic.address,
  name: clinic.name,
  phoneNumber: clinic.user.phoneNumber,
});
