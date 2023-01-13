import apiHandler from "./Helper";

//get users details to render in profile page
export const UserProfileGetDetailAPI = (email) => {
    return apiHandler("GET", `users/email/${email}`, true, false, false)
}

//Fullname or password change: UPDATE PROFILE
export const UserProfileUpdateAPI = (data)=>{
    return apiHandler("POST", `users/updateprofile`, true, false, data)
}

//Photo (Avatar): Profile Picture 
export const UserProfileChangeAvatar = (user, data)=>{
    return apiHandler("POST", `users/avatar/${user._id}`, true, true, data)
}
