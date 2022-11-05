import gamesReducers, { GameType, nextStep } from "./gameSlice"

describe('Board Reducer', () => {
    let initialState: GameType
    beforeEach(() => {



    })
    it("should perform next step", () => {
        const newState = gamesReducers(initialState, nextStep(1))
        expect(newState).toEqual({
            squares: [
                null, "X", null,
                null, null, null,
                null, null, "0"
            ],
            oIsNext: true,
            winner: "X"
        })

    })
})

