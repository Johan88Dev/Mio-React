import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./components/products";
import Home from "./components/home";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
      </Routes>
    );
  }
}

export default App;
