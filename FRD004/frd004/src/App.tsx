import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Board from './components/Board';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Me from './components/about/Me';
import Game from './components/about/Game';
import NoMatch from './components/NoMatch';
import About from './components/about/About';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Link to="/" className="link"> Home</Link>
          <br />
          <Link to="/login" className="link"> Login</Link>
          <br />
          <Link to="/games" className="link"> Board</Link>
          <br />
          <Link to="/about/me" className="link"> About Me</Link>
          <br />
          <Link to="/about/game" className="link"> About Game</Link>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/games" element={<Board />} />

          {/* <Route path="me/:userId" element={<Me />} />
          <Route path="game/:gameId" element={<Game />} /> */}

          <Route path="/about" element={<Header />}>
            <Route path="me/:userId" element={<Me />} />
            <Route path="game/:gameId" element={<Game />} />

          </Route>
          <Route path="*" element={<NoMatch />}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
  // return (
  //   <div className="App">
  //     {/* <Header />
  //     <Login />
  //     <UserProfile /> */}
  //     <Board />
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
