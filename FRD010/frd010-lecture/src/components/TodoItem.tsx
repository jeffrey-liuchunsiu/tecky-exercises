import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchDeleteTodoItem, fetchUpdateTodoItem } from "../redux/todo/thunk";
import { TodoItemState, TodoItemStatus } from "../redux/todo/todoSlice";

interface TodoItemProps {
    item: TodoItemState
}

export default function TodoItems(props: TodoItemProps) {
    const dispatch = useDispatch()

    const onCheckboxChange = () => {
        const newValue: boolean = !getCheckboxState(props.item.status)
        console.log("newValue: ", newValue)
        // Call API
        dispatch(fetchUpdateTodoItem({
            id: props.item.id,
            name: props.item.name,
            status: newValue ? TodoItemStatus.Complete : TodoItemStatus.Active
        }))
    }
    const getCheckboxState = (status: string): boolean => {
        return status == TodoItemStatus.Complete ? true : false
    }

    const onDelete = () => {
        dispatch(fetchDeleteTodoItem({
            id: props.item.id
        }))
    }
    return <div className="todo-item ">
        <div className="checkbox-btn">
            <Form.Check
                type={"checkbox"}
                id={`default-checkbox`}
                defaultChecked={getCheckboxState(props.item.status)}
                onChange={onCheckboxChange}
            // isValid={true}
            />

        </div>
        <div className="todo-text">{props.item.name}</div>
        <div className="delete-btn" onClick={onDelete}>X</div>
    </div>
}
