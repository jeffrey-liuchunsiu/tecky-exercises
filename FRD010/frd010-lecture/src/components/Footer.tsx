import { useSelector, useDispatch } from "react-redux"
import { IRootState } from "../redux/store"
import { changeSearchMode, TodoItemStatus } from "../redux/todo/todoSlice"
interface FooterProps {
    count: number
}
export default function Footer(props: FooterProps) {
    const dispatch = useDispatch()
    const searchMode: TodoItemStatus = useSelector((state: IRootState) => state.todo.searchMode)
    const changeMode = (value: TodoItemStatus)=> {
        dispatch(changeSearchMode(value))
        console.log(searchMode)
    }

    return <div className="footer-container">
        <div className="left-group">{props.count} items left</div>

        <div className="center-group">
            <div className={searchMode == TodoItemStatus.All ? "active" : ""} onClick={() => changeMode(TodoItemStatus.All)}>All</div>
            <div className={searchMode == TodoItemStatus.Active ? "active" : ""} onClick={() => changeMode(TodoItemStatus.Active)}>Active</div>
            <div className={searchMode == TodoItemStatus.Complete ? "active" : ""} onClick={() => changeMode(TodoItemStatus.Complete)}>Completed</div>
        </div>
        {/* <div>test</div> */}
    </div>
}