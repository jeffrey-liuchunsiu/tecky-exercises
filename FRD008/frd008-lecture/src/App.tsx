import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";
import RequireAuth from "./components/RequireAuth";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <nav>
          <Link to={"/"}>Login Page</Link>
          <br />
          <Link to={"/private/todo"}>Todos</Link>
          <br />
        </nav> */}
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/private" element={<RequireAuth />}>
            <Route path="todo" element={<Todo />}></Route>
          </Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
