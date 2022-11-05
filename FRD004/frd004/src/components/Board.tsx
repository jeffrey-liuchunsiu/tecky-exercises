import Square from "./Square";
import "../css/games.css"
import { RootType } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { resetBoard } from "../redux/games/gameSlice";
import WinningModal from "./WinningModal";
import Score from "./Score";

export default function Board() {
    const dispatch = useDispatch()
    const squares = useSelector((state: RootType) => state.game.squares)
    const oIsNext = useSelector((state: RootType) => state.game.oIsNext)
    const winner = useSelector((state: RootType) => state.game.winner)


    const getCurrentPlayer = () => {
        return oIsNext ? "O" : "X"
    }

    const reset = () => {
        dispatch(resetBoard())
    }

    return (
        <div >
            <h1>Board</h1>
            <div>
                {!winner ?
                    <h2>Next Player is {getCurrentPlayer()}</h2> :
                    <h2>The winner is {winner}</h2>

                }
                <button onClick={reset}>
                    Reset the game.
                </button>
            </div>
            <div className="board">
                <div className="board-container">
                    {
                        squares.map((value: string | null, index: number) =>

                            <Square key={index} player={value} index={index} />

                        )
                    }

                    {/* <Square />
                    <Square />
                    <Square />

                    <Square />
                    <Square />
                    <Square />

                    <Square />
                    <Square />
                    <Square /> */}
                    <WinningModal winner={winner} />
                </div>
                <Score />
            </div>
        </div>
    )
}

