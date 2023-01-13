// import axios from "axios"
import apiHandler from "./Helper"

export const PassportLoginGetAPI = () => {
    // return fetch(`http://localhost:8080/auth/login/success`,{
    //             method: 'GET',
    //             credentials: "include",
    //             headers: {
    //               Accept: "application/json",
    //               "Content-Type" : "application/json",
    //               "Access-Control-Allow-Credentials": true,
    //             }
    //         })

    // return axios({
    //     baseURL: 'http://localhost:8080/auth/login/success',
    //     withCredentials: true,
    //     headers: {
    //             Accept: "application/json",
    //             "Content-Type" : "application/json",
    //             "Access-Control-Allow-Credentials": true,
    //         }
    // })
    return apiHandler("GET","/auth/login/success",false,false,false,false,false,true)
}