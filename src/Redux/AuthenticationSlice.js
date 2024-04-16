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
    }
})


export const {changeAuthMode} = AuthenticationSlice.actions 
export default AuthenticationSlice.reducer