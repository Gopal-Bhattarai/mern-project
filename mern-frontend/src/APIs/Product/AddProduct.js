import apiHandler from "../Helper";

export const AddProductAPI = (data)=> {
    return apiHandler("post","products/addproduct", true, false, data )
};