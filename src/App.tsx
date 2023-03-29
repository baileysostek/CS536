import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as gen from './generator';

import SimulationEditor from './views/simulation/SimulationEditor';
import { registerFunction } from './apiary/parser/ApiaryParser';
import { Map } from './progrid/Map';
import { Tile } from './progrid/Tile';


function App() {

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

  // ProGrid specific functions
  registerFunction("build", (map : Map) => {
    return map.build();
  })

  registerFunction("map", (width : number, height : number) => {
    return new Map(width, height);
  })

  registerFunction("grid", (name : string, id: number) => {
    return new Tile(name, id);
  });

  registerFunction("fill", (map : Map, id : number) => {

    for(let index = 0; index < map.grid.length; index++){
      let position = map.indexToXY(index);
      map.setTile(position.pos_x, position.pos_y, id);
    }

    return map.build();
  })

  registerFunction("drunkardsWalkMap", (width, height, steps) => {
    //return gen.drunkardsWalk(width, height, steps);
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
