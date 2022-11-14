import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import image from "../../assets/user_icon.png"

export interface UserType {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    images: string,
    isLoggedIn: boolean
}
const usersSlice = createSlice({
    name: "users",
    initialState: {
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        images: "",
        isLoggedIn: false
    } as UserType,
    reducers: {
        login(state: UserType, action: PayloadAction<any>) {
            state.isLoggedIn = true
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.age = action.payload.age
            state.gender = action.payload.gender
            state.images = action.payload.images
            state.isLoggedIn = action.payload.isLoggedIn
        }



    },
})

export const { login } = usersSlice.actions
export default usersSlice.reducer