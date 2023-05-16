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
