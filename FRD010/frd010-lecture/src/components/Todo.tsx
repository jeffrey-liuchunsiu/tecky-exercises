import { useEffect, useState } from "react"
import "../css/todo.scss"
import { fetchAddTodoItem, fetchGetTodoItems } from "../redux/todo/thunk"
import Footer from "./Footer"
import TodoItems from "./TodoItem"
import { useDispatch, useSelector } from "react-redux"
import { TodoItemState, TodoItemStatus } from "../redux/todo/todoSlice"
import { IRootState } from "../redux/store"
export default function Todo() {
    const dispatch = useDispatch()
    const todoItems:TodoItemState[]  = useSelector((state: IRootState) => state.todo.items)
    const searchMode:TodoItemStatus  = useSelector((state: IRootState) => state.todo.searchMode)

    const [inputValue, setInputValue] = useState<string>("")

    useEffect(() => {
        dispatch(fetchGetTodoItems())
    }, [])

    const onSubmitInput = (event: any) => {
        if(event.key === 'Enter'){
            dispatch(fetchAddTodoItem({
                name: inputValue
            }))
        }
    }
    const getItemCount = () => {
        const items = todoItems.filter(todo => {
            return (searchMode == todo.status || searchMode == TodoItemStatus.All) 
        })
        return items.length
    }



    return <div className="todo-background">
        <div className="topic">todos</div>
        <div>
            <input className="new-todo" 
            value= {inputValue}
            onChange= {(e) => setInputValue(e.target.value)}
            onKeyPress= {onSubmitInput}
            placeholder="What needs to be done?" 
            />
            {
                todoItems.map((todo: TodoItemState) => 
                    (searchMode == todo.status || searchMode == TodoItemStatus.All) && <TodoItems key={todo.id} item={todo}/>
                
                )
            }
            <Footer count={getItemCount()}/>
        </div>
    </div>
}