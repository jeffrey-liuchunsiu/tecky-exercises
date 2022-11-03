import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from './components/Todolist';


interface TodoType {
  id: number,
  name: string
  count: number
}

function App() {
  const [todoItems, setTodoItems] = useState<TodoType[]>(
    [
      {
        id: 1,
        name: 'Buy milk',
        count: 0
      },
      {
        id: 2,
        name: 'Buy banana',
        count: 0
      },
      {
        id: 3,
        name: 'Buy Cherry',
        count: 0
      }
    ]
  )

  const addItem = (name: string) => {
    const newTodoItem = [...todoItems]
    newTodoItem.push({
      id: Number(todoItems[todoItems.length - 1].id) + 1,
      name: name,
      count: 0
    })
    setTodoItems(newTodoItem)
  }

  const removeItem = (id: number) => {
    let newTodoItem = [...todoItems]
    newTodoItem = newTodoItem.filter((item, index) => {
      return item.id != id
    })
    setTodoItems(newTodoItem)
  }

  const onComplete = (index: number) => {
    let newTodoItem = [...todoItems]
    newTodoItem[index].count = newTodoItem[index].count + 1
    setTodoItems(newTodoItem)
  }

  return (
    <div className="App">
      App component
      <Todolist todoItems={todoItems}
        developerName="Jeffrey"
        addItem={addItem}
        removeItem={removeItem}
        onComplete={onComplete} />

    </div>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}


export default App;