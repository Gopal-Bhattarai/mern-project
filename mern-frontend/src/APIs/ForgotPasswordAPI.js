import apiHandler from "./Helper";

export const ForgotPasswordAPI = (data)=>{
    return apiHandler("POST","/users/forgotpassword", false, false, data)
}