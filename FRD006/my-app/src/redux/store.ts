import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserState } from "./users/userSlice"
import logger from 'redux-logger';

export interface IRootState {
    user: UserState
}

const store = configureStore({
    reducer: {
        user: userReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(logger),
})

export default store