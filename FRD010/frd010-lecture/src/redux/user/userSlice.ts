import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFacebookLogin, fetchLogin } from "./thunk";
import jwt_decode from "jwt-decode"
export interface UserState {
    isLoggedIn: boolean
    displayName: string
    errMsg: string
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false
    } as UserState,
    reducers: {
        test() {

        }
    },
    extraReducers: (build) => {
        build.addCase(fetchLogin.pending, (state: UserState) => {
            console.log("pending : " , state.isLoggedIn)
        })
        build.addCase(fetchLogin.fulfilled, login)
        build.addCase(fetchLogin.rejected, (state, action: PayloadAction<{error: string}>) => {
            const error = action.payload.error
            state.errMsg = error
            console.log("rejected : " , state.isLoggedIn)

        })
        build.addCase(fetchFacebookLogin.fulfilled, login)
    }
})

const login = (state: UserState, action: PayloadAction<{token: string}>) => {
    state.isLoggedIn = true
    const token = action.payload.token
    let payload = jwt_decode<{
        displayName: string,
        user_id: number
    }>(token)
    localStorage.setItem("token", token)
    state.displayName = payload.displayName
    console.log("fulfilled : " , state.isLoggedIn)
}
export default userSlice.reducer