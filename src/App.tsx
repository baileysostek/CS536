import React from 'react';
import logo from './logo.svg';
import './App.css';

import SimulationEditor from './views/simulation/SimulationEditor';
import { registerFunction } from './apiary/parser/ApiaryParser';


function App() {

  registerFunction("helloWorld", (messsage) => {
    console.log(messsage.value);
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
