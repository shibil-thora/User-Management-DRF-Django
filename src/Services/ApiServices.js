import axios from 'axios'; 

export const host = 'http://127.0.0.1:8000' 

export function LoginUser(userData) {
    return axios.post(`${host}/login_user/`, userData).then((res) => {
        return res
    })
}

export function SignUpUser(userData) {
    return axios.post(`${host}/signup_user/`, userData).then((res) => {
        return res
    })
}

export function AddUser(userData) {
    return axios.post(`${host}/add_user/`, {userData, access: localStorage.getItem('access')}).then((res) => {
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

export function getQueryUserSet(query) {
    return axios.post(`${host}/search/`, {access: localStorage.getItem('access'), query}).then((res) => {
        return res
    })
}

export function postImage(image) {
    const formData = new FormData();
    formData.append('image', image)
    formData.append('access', localStorage.getItem('access'))

    return axios.post(`${host}/update_profile_image/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        }
    }).then((res) => {
        return res
    })
}