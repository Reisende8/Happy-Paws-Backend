export const getVetSpeclDTO = (vetSpecl) => {
  return vetSpecl.map((vs) => {
    return { id: vs.id, name: vs.name };
  });
};
