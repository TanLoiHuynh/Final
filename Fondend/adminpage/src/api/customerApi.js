import axiosClient from "./axiosClient";

const customerApi = {
    getAllCustomer() {
        const url = '/user/all';
        return axiosClient.get(url)
    },
    getCustomerById(userId){
        return axiosClient.get(`/user/search/${userId}`)
    },
    addCustomer(formData){
        return axiosClient.post(`/user/add`, formData)
    },
    updateCustomer(userId, formData){
        return axiosClient.put(`/user/update/${userId}`, formData)
    },
    deleteCustomer(userId){
        return axiosClient.delete(`/user/delete/${userId}`)
    }
}
export default customerApi;