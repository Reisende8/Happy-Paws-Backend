export const getAnimalsDTO = (animals) => {
  return animals.map((animal) => {
    return { id: animal.id, name: animal.name };
  });
};
