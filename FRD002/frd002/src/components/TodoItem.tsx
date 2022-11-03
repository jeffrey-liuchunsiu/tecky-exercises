import React from "react";
import "../css/todo.css"

interface TodoItemProps {
    id: number
    name: string
    count: number
    index: number
    removeItem: (id: number) => void
    onComplete: (index: number) => void
}

// export default class TodoItem extends React.Component<TodoItemProps, { count: number , a: any[]}> {
export default class TodoItem extends React.Component<TodoItemProps, { count: number }> {

    constructor(props: TodoItemProps) {
        super(props)
        // this.state = {
        //     count: 0
        // }
    }

    // onComplete = () => {

    //     // this.setState(

    //     //     {
    //     //         count: this.state.count + 1,
    //     //         // a:[{

    //     //         // }]
    //     //     }

    //     // )
    // }
    public render() {
        return (
            <div className="todoItem-container">

                <button onClick={() => this.props.onComplete(this.props.index)}>Complete</button>
                <button onClick={() => this.props.removeItem(this.props.id)}>Remove</button>
                <span>{this.props.name} ({this.props.count})</span>
            </div>
        )
    }
}