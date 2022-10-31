import React from 'react';
import logo from './logo.svg';
import './App.css';
import { isNamespaceExport } from 'typescript';
import ShoppingList from './components/ShoppingList';
import FunctionShoppingList from './components/FunctionShoppingList';
import TodoList from './components/TodoList';


function App() {
  type user = {
    firstName: string,
    lastName: string
    image: string
  };
  // const user: {
  //   firstName: string,
  //   lastName: string
  //   image: string
  // } = {
  //   firstName: 'Jeffrey',
  //   lastName: "Liu",
  //   image: "/favicon.ico"
  // }

  const user = {
    firstName: 'Jeffrey',
    lastName: "Liu",
    image: "/favicon.ico"
  }

  const element = <h1>Hello, world!</h1>;

  const element2 = (
    <div>
      <h1>
        Hello, Tecky.
      </h1>
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
      </ul>
    </div>
  );

  const image = <img src={user.image} />;
  // const image = <img src="/favicon.ico" />;

  const isDisplayName: boolean = true

  function displayName(user: user
    // {
    //   firstName: string,
    //   lastName: string
    // }
  ) {
    return user.firstName + ' ' + user.lastName;
  }

  const isLoggedIn: boolean = false;

  const names: string[] = ["gordon", "alex", "michael"];

  const displayNameList = () => {
    return names.map((map: string, index: number) => {
      return (
        <ul>
          <li>{map}</li>
        </ul>
      )
    })
  }

  const isDisplayClassComponent: boolean = false

  return (
    <div className="App">
      <TodoList />
      {/* {isDisplayClassComponent ? <ShoppingList /> : <FunctionShoppingList />} */}
      {/* <ShoppingList />
      <FunctionShoppingList /> */}
    </div>
  )

  // return (
  //   <div className="App">
  //     <h1>Hello, Jeffrey </h1>
  //     <div>{element}</div>
  //     <div>{element2}</div>
  //     <div>{isDisplayName && displayName(user)}</div>
  //     <div>{image}</div>

  //     <div />

  //     <div></div>

  //     <div>{"false"}</div>

  //     <div>{null}</div>

  //     <div>{undefined}</div>

  //     <div>{true}</div>
  //     {/* <div>The user is {isLoggedIn ? "Hello James!" : "Please Login First"}</div> */}
  //     <div>The user is {isLoggedIn ? "Hello James!" : <LoginButton />}</div>
  //     <div>
  //       {displayNameList()
  //         // names.map((map: string, index: number) => {
  //         //   return (
  //         //     <ul>
  //         //       <li>{map}</li>
  //         //     </ul>
  //         //   )
  //         // })
  //       }
  //     </div>
  //   </div>
  // )

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

function LoginButton() {
  return (
    <div>
      <button>Login !!</button>
    </div>
  )
}

export default App;
