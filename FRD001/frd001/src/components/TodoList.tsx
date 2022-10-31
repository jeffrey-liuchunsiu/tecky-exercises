import { useState } from "react"
// import "../css/todolist.css"
import style from "../css/todolist.module.css"
import TodoItem from "./Todoitem"

export default function TodoList() {

    const [items, setItems] = useState<string[]>(
        [
            "ReactJs",
            "Nodejs",
            "HTML"
        ]
    )

    const [inputValue, setInputValue] = useState<string>("123")

    const addItems = () => {
        let newItem = [...items]
        newItem.push(inputValue)
        setItems(newItem)
    }

    const changeInputText = (value: string) => {
        setInputValue(value)
    }

    return (
        <div className={style.todoList}>
            <h2 className={style.title}>ToDo List</h2>
            <h1>By Jeffrey</h1>
            <span><input value={inputValue} onChange={(e) => changeInputText(e.target.value)} /></span>
            <button onClick={addItems}>Add</button>
            <div className={style.todoItem}>
                {items.map((item: string, index: number) => {
                    return (
                        <div>
                            {<TodoItem value={item} />}
                        </div>
                    )
                })}
                {/* <TodoItem />
                <TodoItem />
                <TodoItem /> */}
            </div>
        </div>
    )
}