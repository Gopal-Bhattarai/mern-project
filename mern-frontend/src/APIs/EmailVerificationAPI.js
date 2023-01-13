import apiHandler from "./Helper";

export const EmailVerificationAPI = (params)=>{
    return apiHandler("GET","users/emailverification", false, false, false, params);
}