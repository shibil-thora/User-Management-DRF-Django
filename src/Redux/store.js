import {configureStore} from '@reduxjs/toolkit' 
import AuthReducer from './AuthenticationSlice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
    }
}) 