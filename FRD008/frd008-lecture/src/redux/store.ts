import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./user/userSlice"
import todoReducer, { TodoListState } from "./todo/todoSlice"
export interface IRootState {
    user: UserState
    todo: TodoListState
}

const store = configureStore<IRootState>({
    reducer: {
       user: userReducer,
       todo: todoReducer
    }
})

export default store