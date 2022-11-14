import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchLogin: any = createAsyncThunk("user/fetchLogin", async (params: {
    username: string
    password: string
}, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: params.username,
                password: params.password
            })
        })
        const data = await res.json()
        if (!res.ok) {
            throw data.msg
        }
        return thunkAPI.fulfillWithValue<{
            token: string
        }>({
            token: data.token
        })
    } catch (e) {
        console.log(e)
        return thunkAPI.rejectWithValue({error: e})
    }
})

export const fetchFacebookLogin: any = createAsyncThunk("user/fetchFacebookLogin", async (params: {
    token: string
}, thunkAPI) => {
    console.log("fetchFacebookLogin: ", params.token)
    try {
        const res = await fetch("http://localhost:8080/login/facebook", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                token: params.token,
            })
        })
        const data = await res.json()
        if (!res.ok) {
            throw data.msg
        }
        return thunkAPI.fulfillWithValue<{
            token: string
        }>({
            token: data.token
        })
    } catch (e) {
        console.log(e)
        return thunkAPI.rejectWithValue({error: e})
    }
})