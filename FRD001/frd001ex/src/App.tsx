import React from 'react';
import logo from './logo.svg';
import './App.css';
import style from "./css/style.module.scss"
import Simple from './components/Simple';
import { Helmet } from "react-helmet";


function App() {

  const header = <h1>Simple Website</h1>;
  // const section = <div>This is a simple website made without React. Try to convert this into React enabled</div>

  const steps: string[] = ["create-react-app", "npm start"]
  const image = <img src="/favicon.ico" />;

  const displayList = (item: number) => {
    return (
      <span className={style.command}> {steps[item]}</span>
      // steps.map((step: string, index: number) => {
      //   return (
      //     <li>{step}</li>
      //   )
      // })
    )
  }

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Simple />

    </div>
  )


  // return (
  //   <body className={style.body}>
  //     <header>
  //       {header}
  //     </header>
  //     <section>
  //       This is a simple website made without React. Try to convert this into React enabled.
  //       <ol>

  //         <li>First, you need to use {displayList(0)}</li>
  //         {/* <li>First, you need to use <span class="command">create-react-app</span></li> */}
  //         <li>Second, you need to run {displayList(1)}</li>
  //         {/* <li>Second, you need to run <span class="command">npm start</span></li> */}
  //       </ol>
  //     </section>
  //     <footer className={style.footer}>
  //       {image}
  //     </footer>
  //   </body>
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
