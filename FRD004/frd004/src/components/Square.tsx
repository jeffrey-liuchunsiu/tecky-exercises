import { useDispatch } from "react-redux"
import { nextStep } from "../redux/games/gameSlice"

interface SquareProps {
    player: string | null
    index: number
}

export default function Square(props: SquareProps) {
    const dispatch = useDispatch()


    const updateBoard = () => {
        dispatch(nextStep(props.index))
    }
    return (
        <div className="square-container" onClick={updateBoard}>
            <div className="player">

                {props.player}
            </div>
        </div>
    )
}