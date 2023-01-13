import apiHandler from "./Helper";

export const ResetPasswordAPI = (data) => {
    return apiHandler("POST", "users/resetpassword", false, false, data)
}