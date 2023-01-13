import apiHandler from "../Helper";

export const DeleteProductAPI = (id)=> {
    return apiHandler("DELETE",`products/deleteproduct/${id}`, true, false )
};