import apiHandler from "./Helper"

//get users details to render in profile page
export const SingleProduct = (productid) => {
    return apiHandler("GET", `products/public/${productid}`, false, false, false)
}