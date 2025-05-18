import axiosClient from "./axiosClient";

const categoryApi = {
    getAllCategory() {
        const url = '/category/all';
        return axiosClient.get(url)
    },
    addCategory(formData){
        return axiosClient.post(`/category/add`, formData)
    },
    updateCategory(categoryId, formData){
        return axiosClient.put(`/category/update/${categoryId}`, formData)
    },
    deleteCategory(categoryId){
        return axiosClient.delete(`/category/delete/${categoryId}`)
    }

}
export default categoryApi;