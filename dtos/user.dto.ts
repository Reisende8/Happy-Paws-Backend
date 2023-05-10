export const registerClientDTO = (user, client) => ({
  userId: user.id,
  roleId: user.roleId,
  email: user.email,
  firstName: client.firstName,
  lastName: client.lastName,
  phoneNumber: user.phoneNumber,
});

export const registerClinicDTO = (user, clinic) => ({
  userId: user.id,
  roleId: user.roleId,
  email: user.email,
  address: clinic.address,
  name: clinic.name,
  phoneNumber: user.phoneNumber,
});
