import axios from 'axios'; 

export const host = 'http://127.0.0.1:8000' 

export function LoginUser(userData) {
    return axios.post(`${host}/login_user/`, userData).then((res) => {
        return res
    })
}

export function getUserSet() {
    return axios.post(`${host}/user_set/`, {access: localStorage.getItem('access')}).then((res) => {
        return res
    })
}

export function deleteUser(id) {
    return axios.post(`${host}/delete_user/`, {access: localStorage.getItem('access'), delete_id: id}).then((res) => {
        return res
    })
}

export function editUser(user) {
    return axios.post(`${host}/edit_user/`, {access: localStorage.getItem('access'), user}).then((res) => {
        return res
    })
}