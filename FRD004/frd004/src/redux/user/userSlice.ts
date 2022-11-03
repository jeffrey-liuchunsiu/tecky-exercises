import { createSlice } from "@reduxjs/toolkit"
import image from "../../assets/user_icon.png"

interface UserType {
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
        firstName: "James",
        lastName: "Lam",
        age: 19,
        gender: "male",
        images: image,
        isLoggedIn: true
    } as UserType,
    reducers: {

    },
})

export default usersSlice.reducer