import React from 'react';
import logo from './logo.svg';
import './App.css';

import SimulationEditor from './views/simulation/SimulationEditor';
import { registerFunction } from './apiary/parser/ApiaryParser';
import { Map } from './progrid/Map';


function App() {

  registerFunction("add", (a, ...b) => {
    
    let value = a;

    for(let argument of b){
      value += argument;
    }

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

  registerFunction("equal", (a : number, b : number) => {
    return a === b;
  })

  // ProGrid specific functions

  registerFunction("build", (map : Map) => {
    return map.build();
  })

  registerFunction("map", (width : number, height : number) => {
    return new Map(width, height);
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
