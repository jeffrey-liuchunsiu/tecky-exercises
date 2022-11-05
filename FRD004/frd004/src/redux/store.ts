import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserType } from "./user/userSlice"
import gameReducer, { GameType } from "./games/gameSlice"
import scoreReducer, { ScoreType } from './scores/scoreSlice'


export interface RootType {
    user: UserType,
    game: GameType,
    score: ScoreType[]
}

const store = configureStore<RootType>({
    reducer: {
        user: userReducer,
        game: gameReducer,
        score: scoreReducer

    }
})
export default store