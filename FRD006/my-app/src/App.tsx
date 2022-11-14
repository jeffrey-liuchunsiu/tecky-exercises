import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IRootState } from './redux/store';
import { renameAction } from './redux/users/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const dispatch = useDispatch()
  const name = useSelector((state: IRootState) => state.user.name)

  const rename = () => {
    dispatch(renameAction())
  }

  // return (
  //   <div>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/games" element={<Board />} />
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // )

  return (
    <div className="App">
      <div>{name}</div>
      <button onClick={rename}> Rename</button>
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