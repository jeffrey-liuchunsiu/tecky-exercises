import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Square from "../../components/Square"



export interface GameType {
    squares: Array<string | null>
    oIsNext: boolean
    winner: string
}

const resetSquares = () => {
    let squares: Array<string | null> = []
    for (let i = 0; i < 9; i++) {
        squares.push(null)
    }
    return squares
}

const getWinner = (state: GameType) => {
    const winningConditionals = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let winningConditional of winningConditionals) {
        const [a, b, c] = winningConditional
        const squaresA = state.squares[a]
        const squaresB = state.squares[b]
        const squaresC = state.squares[c]
        if (squaresA != null && squaresA == squaresB && squaresA == squaresC) {
            return squaresA
        }
    }
    return null
}

const getInitialState = (): GameType => {
    const data = localStorage.getItem("gameState")
    if (data) {
        return JSON.parse(data)
    }
    return {
        squares: resetSquares(),
        oIsNext: true,
        winner: ""
    }
}

const gameSlice = createSlice({
    name: "games",
    initialState: getInitialState() as GameType,
    // initialState: {
    //     squares: resetSquares(),
    //     oIsNext: true,
    //     winner: ""
    // } as GameType,
    reducers: {
        nextStep(state: GameType, action: PayloadAction<number>) {
            const index = action.payload
            if (state.squares[index] == null) {
                state.squares[index] = state.oIsNext ? "O" : "X"
                state.oIsNext = !state.oIsNext
                const winner = getWinner(state)
                if (winner) {
                    state.winner = winner
                }
                console.log(winner)
                localStorage.setItem("gameState", JSON.stringify(state))
            }
        },
        resetBoard(state: GameType) {
            state.squares = resetSquares()
            state.oIsNext = true
            state.winner = ""
            localStorage.removeItem("gameState")
        }
    }
})

export const { nextStep, resetBoard } = gameSlice.actions
export default gameSlice.reducer