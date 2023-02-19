import React from 'react';
import logo from './logo.svg';
import './App.css';

import SimulationEditor from './views/simulation/SimulationEditor';
import { registerFunction } from './apiary/parser/ApiaryParser';


function App() {

  registerFunction("helloWorld", (messsage) => {
    console.log(messsage.value);
  })

  registerFunction("print", (...parameters) => {
    console.log(...parameters)
  })

  registerFunction("add", (a : number, b : number) => {
    let value = a + b;
    return value;
  })

  registerFunction("sub", (a : number, b : number) => {
    let value = a - b;
    return value;
  })

  registerFunction("mul", (a : number, b : number) => {
    let value = a * b;
    return value;
  })

  registerFunction("div", (a : number, b : number) => {
    let value = a / b;
    return value;
  })

  registerFunction("mod", (a : number, b : number) => {
    let value = a % b;
    return value;
  })

  registerFunction("pow", (a : number, b : number) => {
    let value = Math.pow(a, b);
    return value;
  })

  return (
    <div className="App">
      <header className="App-header">
        <SimulationEditor/>
      </header>
    </div>
  );
}

export default App;
