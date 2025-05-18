import axiosClient from "./axiosClient";

const adminApi = {
    getAllAdmin() {
        const url = '/admin/all';
        return axiosClient.get(url)
    },
    getAdminById(id){
        return axiosClient.get(`/admin/search/${id}`)
    },
    addAdmin(formData){
        return axiosClient.post(`/admin/add`, formData)
    },
    updateAdmin(quanTriID, formData){
        return axiosClient.put(`/admin/update/${quanTriID}`, formData)
    },
    deleteAdmin(quanTriID){
        return axiosClient.delete(`/admin/delete/${quanTriID}`)
    }
    // getThumbnailsRoomId(id){
    //     return axiosClient.get(`/image/by-image/${id}`)
    // }
}
export default adminApi;