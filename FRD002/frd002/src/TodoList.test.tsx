import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react'
import Todolist from "./components/Todolist"
import TodoItem from "./components/TodoItem"

jest.mock("./components/Todolist", () => () => {
    return (
        <div>TodoItem Test Case</div>
    )
})
interface TodoType {
    id: number
    name: string
    count: number
}

describe('TodoList Unit Test', () => {
    it("should contains all todo items", () => {
        let todoItems: TodoType[] = []
        for (let i = 0; i < 4; i++) {
            todoItems.push(
                {
                    id: i + 1,
                    name: "ABC",
                    count: 0
                }
            )
        }
        let addItem: jest.Mock = jest.fn();
        let removeItem: jest.Mock = jest.fn();
        let onComplete: jest.Mock = jest.fn();
        render(
            <Todolist
                todoItems={todoItems}
                developerName="Jeffrey"
                addItem={addItem}
                removeItem={removeItem}
                onComplete={onComplete} />
        )
        const elements = screen.getAllByText("TodoItem Test Case")
        console.log(elements)
        expect(elements.length).toEqual(todoItems.length)
    })
})

// describe("TodoItem unit test", () => {
//     it("should", () => {
//         let removeItem: jest.Mock = jest.fn();
//         render(
//             <TodoItem
//                 id={78978}
//                 name={"abc"}
//                 removeItem={removeItem}
//             />

//         )
//         const element = screen.getByText(/Remove/i)
//         element.click()
//         expect(removeItem).toBeCalled()
//     })
// })