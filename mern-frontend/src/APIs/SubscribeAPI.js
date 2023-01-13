import apiHandler from "./Helper";

export const SubscribeAPI = (data)=> {
    return apiHandler("post","email/sendEmail", false, false, data )
};