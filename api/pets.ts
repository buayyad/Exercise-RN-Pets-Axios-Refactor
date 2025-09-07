import api from "./petsApi";

export const getPets = async () => {
  const response = await api.get("");
  return response.data;
};

export const getPetById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createPet = async (petData: {
  name: string;
  image: string;
  type: string;
  adopted: 0 | 1;
}) => {
  const response = await api.post("", petData);
  return response.data;
};

export const deletePet = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
