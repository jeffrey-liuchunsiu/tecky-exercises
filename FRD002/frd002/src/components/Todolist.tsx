import TodoItem from "./TodoItem"
import { useState } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AlertBox from "./AlertBox";

interface TodoType {
    id: number,
    name: string
    count: number
}
interface TodoListProps {
    addItem: (name: string) => void
    removeItem: (id: number) => void
    onComplete: (index: number) => void
    todoItems: TodoType[]
    developerName: string
}

export default function Todolist(props: TodoListProps) {

    const [inputValue, setInputValue] = useState<string>("")
    // console.log(inputValue)

    const getNewTaskCount = (): {
        newCount: number
        doneCount: number
    } => {
        let result: {
            newCount: number
            doneCount: number
        } = {
            newCount: 0,
            doneCount: 0
        }
        for (let todoItem of props.todoItems) {
            if (todoItem.count == 0) {
                result.newCount++;
            } else {
                result.doneCount++;
            }
        }
        return result
    }
    return (
        <div>
            TodoList
            <h2>by {props.developerName}</h2>
            <div className="counter-container">
                <div>
                    New Task: {getNewTaskCount().newCount}
                </div>
                <div>
                    Done Task: {getNewTaskCount().doneCount}
                </div>
            </div>
            <span><input value={inputValue} onChange={(e) => setInputValue(e.target.value)} /></span>
            <button onClick={() => props.addItem(inputValue)}>Add</button>
            {
                props.todoItems.map((currentValue: TodoType, index: number) => {
                    return (
                        <div key={currentValue.id}>
                            <TodoItem id={currentValue.id}
                                index={index}
                                key={index}
                                name={currentValue.name}
                                count={currentValue.count}
                                removeItem={props.removeItem}
                                onComplete={props.onComplete} />
                        </div>
                    )
                })
            }

            {/* <a className="btn btn-primary">Click me</a>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>

            <AlertBox /> */}
        </div>
    )
}