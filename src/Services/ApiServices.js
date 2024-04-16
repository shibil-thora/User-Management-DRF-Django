import axios from 'axios'; 

const host = 'http://127.0.0.1:8000' 

export function LoginUser(userData) {
    return axios.post(`${host}/login_user/`, userData).then((res) => {
        return res
    })
}