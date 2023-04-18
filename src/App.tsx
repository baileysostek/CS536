import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as gen from './generator';

import SimulationEditor from './views/simulation/SimulationEditor';
import { registerFunction } from './apiary/parser/ApiaryParser';
import { Map } from './progrid/Map';
import { Tile } from './progrid/Tile';

function App() {

  // Random values
  registerFunction("seed", (seed) => {
    gen.seedRandom(seed);
    return gen.getRandom();
  })

  registerFunction("randomInt", (range) => {
    return gen.randomInt(0, range);
  })

  registerFunction("randomFloat", () => {
    return gen.randomFloat();
  })

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

  registerFunction("grid", (name : string, id: number) => {
    return new Tile(name, id);
  });

  registerFunction("fill", (map : Map, id : number) => {

    for(let index = 0; index < map.grid.length; index++){
      let position = map.indexToXY(index);
      map.setTile(position.pos_x, position.pos_y, id);
    }

    return map;
  })

  registerFunction("replace", (map : Map, target : number, replacement : number, chance : number) => {

    for(let index = 0; index < map.grid.length; index++){
      let position = map.indexToXY(index);
      if(map.getTile(position.pos_x, position.pos_y) == target){
          if(gen.randomFloat() <= chance){
            map.setTile(position.pos_x, position.pos_y, replacement);
          }
      }
    }

    return map;
  })

  registerFunction("drunkardsWalkMap", (map : Map, steps : number, fill_tile : number) => {
    return gen.drunkardsWalk(map, steps, fill_tile);
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
