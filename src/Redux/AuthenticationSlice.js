import {createSlice} from '@reduxjs/toolkit' 

const INITIAL_STATE = {
    user: {}, 
} 

export const AuthenticationSlice = createSlice({
    name: 'auth', 
    initialState: INITIAL_STATE, 
    reducers: {
        changeAuthMode: (state, action) => {
            state.user = action.payload.user;
        },
        logOut: (state, action) => {
            state.user = {}
            localStorage.setItem('access', ''); 
            localStorage.setItem('refresh', ''); 
        }
    }
})


export const {changeAuthMode, logOut} = AuthenticationSlice.actions 
export default AuthenticationSlice.reducer