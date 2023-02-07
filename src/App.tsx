import React from 'react';
import logo from './logo.svg';
import './App.css';

import GPUIOWrapper from './components/simulation/GPUIOWrapper';
import SimulationEditor from './views/simulation/SimulationEditor';
import { Agent } from './apiary/simulation/Agent';
import { Attribute } from './apiary/simulation/Attribute';
import { GLES_FLOAT } from './apiary/simulation/GLSLPrimativeTypes';

function App() {

  let conwayAgent = new Agent("Conway Game of Life Cell", [
    new Attribute("live", GLES_FLOAT)
  ]);

  console.log(conwayAgent.name, 'size', conwayAgent.calculateAgentSizeInFloats());

  return (
    <div className="App">
      <header className="App-header">
        <SimulationEditor/>
      </header>
    </div>
  );
}

export default App;
