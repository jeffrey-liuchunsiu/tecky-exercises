import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./user/userSlice"

export interface IRootState {
    user: UserState
}

const store = configureStore<IRootState>({
    reducer: {
       user: userReducer
    }
})

export default store