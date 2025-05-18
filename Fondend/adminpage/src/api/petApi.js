import axiosClient from "./axiosClient";

const petApi = {
    getAllPet() {
        const url = '/pets/all';
        return axiosClient.get(url)
    },
    getPetById(pet_id){
        return axiosClient.get(`/pets/search/${pet_id}`)
    },
    addPet(formData){
        return axiosClient.post(`/pets/add`, formData, {

          });
    },
    updatePet(pet_id, formData){
        return axiosClient.put(`/pets/update/${pet_id}`, formData)
    },
    deletePet(pet_id){
        return axiosClient.delete(`/pets/delete/${pet_id}`)
    }
}
export default petApi;
