import "./App.css";
import React from "react";
import { GlobalStyle, Container } from "./components/layout/global-style";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Navbar/Nav";
import Banner from "./components/Banner/Banner";
import SimulationEditor from "./views/simulation/SimulationEditor";
import { registerFunction } from "./apiary/parser/ApiaryParser";
import { Map } from "./progrid/Map";

const Homepage = (): JSX.Element => {
  registerFunction("print", (...parameters) => {
    console.log(...parameters);
  });

  registerFunction("add", (a: number, b: number) => {
    let value = a + b;
    return value;
  });

  registerFunction("sub", (a: number, b: number) => {
    let value = a - b;
    return value;
  });

  registerFunction("mul", (a: number, b: number) => {
    let value = a * b;
    return value;
  });

  registerFunction("div", (a: number, b: number) => {
    let value = a / b;
    return value;
  });

  registerFunction("mod", (a: number, b: number) => {
    let value = a % b;
    return value;
  });

  registerFunction("pow", (a: number, b: number) => {
    let value = Math.pow(a, b);
    return value;
  });

  // ProGrid specific functions

  registerFunction("build", (map: Map) => {
    return map.build();
  });

  registerFunction("map", (width: number, height: number) => {
    return new Map(width, height);
  });

  return (
    <Container>
      <GlobalStyle />
      <Nav />
    </Container>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Nav />
              <Banner />
              <SimulationEditor />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
