import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'


export const store = configureStore({
    reducer: {
        //aca adentro van los reducers, o porcion de estados de redux
        user: userReducer
    },
})