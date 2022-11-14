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
        console.log(data.displayName)
        return thunkAPI.fulfillWithValue({
            displayName: data.displayName
        })

    } catch (e) {
        console.log(e)
        return thunkAPI.rejectWithValue({ error: e })
    }

})
