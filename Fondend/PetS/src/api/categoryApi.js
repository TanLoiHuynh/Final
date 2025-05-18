import axiosClient from './axiosClient';  

const categoryApi = {
  getAll: async () => {
    const response = await axiosClient.get("category/all");  
    return response.data; 
  },
};

export default categoryApi;
