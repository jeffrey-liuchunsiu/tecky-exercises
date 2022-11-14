import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    name: string
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "Jeffrey"
    } as UserState,
    reducers: {
        renameAction(state: UserState) {
            state.name = "james"
        }
    }
})

export const { renameAction } = userSlice.actions
export default userSlice.reducer