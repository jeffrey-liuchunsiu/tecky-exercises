import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

function App() {

  return (
    <div className="App">
      {/* <Header /> */}
      <Login />
      {/* <UserProfile /> */}
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