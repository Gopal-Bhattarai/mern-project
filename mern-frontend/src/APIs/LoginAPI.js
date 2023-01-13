import apiHandler from "./Helper";

export const LoginAPI = (data)=> {
    return apiHandler("post","users/login", false, false, data )
};