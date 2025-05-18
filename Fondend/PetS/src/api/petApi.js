import axiosClient from './axiosClient';  // Import axiosClient

const petApi = {
  getAll: () => axiosClient.get("pets/all"),
  getCats: () => axiosClient.get("pets/type/true"),
  getDogs: () => axiosClient.get("pets/type/false"),
  getById: (id) => axiosClient.get(`pets/search/${id}`),
  searchByName: (name) => axiosClient.get(`pets/search?name=${name}`),
};

export default petApi;
