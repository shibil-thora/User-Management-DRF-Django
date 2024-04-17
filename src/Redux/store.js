import {configureStore} from '@reduxjs/toolkit' 
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from './AuthenticationSlice'

const persistConfig = {
    key: 'root', 
    storage
}

const persistedReducer = persistReducer(persistConfig, AuthReducer); 

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    }
});

export const persistor = persistStore(store)

