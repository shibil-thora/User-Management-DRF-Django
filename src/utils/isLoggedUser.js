import { host } from "../Services/ApiServices"
import axios from "axios";


export function isLoggedUser() {
    return axios.post(`${host}`, {access: localStorage.getItem('access')}).then((res) => {
        return res.status
    }).catch((err) => {
        const refreshTokon = localStorage.getItem('refresh') ;
        return axios.post(`${host}/api/token/refresh/`, {refresh: refreshTokon}).then((res) => {
            localStorage.setItem('access', res.data.access) 
            console.log('successfully refreshed')
            return res.status
        })
    })
}
