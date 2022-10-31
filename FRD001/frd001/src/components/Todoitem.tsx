import { useState } from "react"
import style from "../css/todolist.module.css"
interface TodoItemProps {
    value: string
}

export default function TodoItem(props: TodoItemProps) {
    const [count, setCount] = useState<number>(0)

    const addComplete = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <span>
                <button onClick={addComplete}>Complete</button>
            </span>
            <span>Buy {props.value}</span>
            <span>({count})</span>
        </div>
    )
}