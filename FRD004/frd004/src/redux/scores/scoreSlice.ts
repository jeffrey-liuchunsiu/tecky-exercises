import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ScoreType {
    squares: Array<string | null>
    name: string
    email: string
    winner: string
}

const scoreSlice = createSlice({
    name: "score",
    initialState: [

    ] as ScoreType[],
    reducers: {
        addRecord(state: ScoreType[], action: PayloadAction<ScoreType>) {
            const newState = [...state]
            newState.push({
                squares: action.payload.squares,
                name: action.payload.name,
                email: action.payload.email,
                winner: action.payload.winner,
            })
            return newState
        }
    }
})

export const { addRecord } = scoreSlice.actions
export default scoreSlice.reducer