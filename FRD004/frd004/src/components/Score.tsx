import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../redux/store";

export default function Score() {
    const dispatch = useDispatch()

    const scores = useSelector((state: RootType) => state.score)

    console.log(scores)
    return <div>
        Score Board :

        {
            scores.map((score, index) => <div key={index}>
                <div> Name : {score.name}</div>
                <div> email: {score.email}</div>
            </div>)
        }


    </div>
}