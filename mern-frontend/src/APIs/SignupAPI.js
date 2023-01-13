import apiHandler from "./Helper";

export const SignupAPI = (data)=> {
    return apiHandler("post","users/signup", false, false, data )
};