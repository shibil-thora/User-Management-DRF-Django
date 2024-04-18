import {createSlice} from '@reduxjs/toolkit' 

const INITIAL_STATE = {
    user: {}, 
    profileImage: '',
} 

export const AuthenticationSlice = createSlice({
    name: 'auth', 
    initialState: INITIAL_STATE, 
    reducers: {
        changeAuthMode: (state, action) => {
            state.user = action.payload.user;
            state.profileImage = action.payload.profile_image_url;
        },
        logOut: (state, action) => {
            state.user = {}
            state.profileImage = ''
            localStorage.setItem('access', ''); 
            localStorage.setItem('refresh', ''); 
        },
        updateImageURL: (state, action) => {
            state.profileImage = action.payload;
            console.log(action.payload)
        }
    }
})


export const {changeAuthMode, logOut, updateImageURL} = AuthenticationSlice.actions 
export default AuthenticationSlice.reducer