import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Lifecycle from './components/Lifecycle';
import { useState } from 'react';
import Clock from './components/Clock';
import Form from './components/Form';
import HookForm from './components/HookForm';



function App() {

  return (
    <div className="App">
      <HookForm />

    </div>
  )
  // const [isShow, setIsShow] = useState<boolean>(false)

  // return (
  //   <div className="App">
  //     <Clock />
  //   </div>
  // )

  // return (
  //   <div className="App">
  //     {isShow && <Lifecycle />}
  //     <button onClick={() => setIsShow(!isShow)}>{isShow ? "disable Lifecycle" : "enable Lifecyle"}</button>
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

export default App;
